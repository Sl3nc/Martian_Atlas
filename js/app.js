// Orquestra o app: estado, abas do painel, registro de eventos, histórico,
// acompanhamento do trajeto e integração com o mapa.

import {
  createWorld,
  addObstacle,
  removeObstacle,
  elevationAt,
  slopeAt,
  isTraversableAt,
  obstaclesAt,
} from './core/world.js';
import { planRoute, planAlternatives, firstBlockedAlong, boundsOf } from './core/route.js';
import { TraverseSimulation } from './core/traverse.js';
import {
  isInsideMap,
  kmToLonLat,
  estimateMissionSol,
  formatDistance,
  formatDuration,
  formatElevation,
  formatKmPosition,
  formatNumber,
  toEastingNorthing,
} from './core/geo.js';
import { loadDatasets, DATA_FILES } from './data/datasets.js';
import {
  CRITICALITY,
  DEFAULT_SEVERITY,
  createUserObstacle,
  isUserObstacle,
  nextUserObstacleId,
  displayName,
} from './model/obstacles.js';
import { createSample } from './model/samples.js';
import { MapView, SAMPLE_COLORS } from './ui/mapView.js';
import { ElevationProfile } from './ui/profile.js';
import { renderRelief, renderSlope, loadImage } from './ui/terrainRenderer.js';
import * as storage from './ui/storage.js';
import * as T from './ui/templates.js';

const $ = (selector) => document.querySelector(selector);

const state = {
  tab: 'explore', // explore | routes | history
  overlay: null, // detalhe ou formulário aberto por cima da aba
  query: '',
  placing: null, // 'sample' | 'obstacle' enquanto o usuário escolhe o local no mapa
  stops: [null, null], // { ref?, name, x, y }
  picking: -1,
  routes: [],
  selectedRouteId: null,
  traverse: null,
  userSamples: [],
  history: [],
  historyPreviewId: null,
  openGroups: new Set(), // níveis de criticidade com o acordeão aberto (aba Explorar)
};

let data; // datasets carregados
let world;
let map;
let profile = null;
let toastTimer = 0;
let frame = 0;
let lastTick = 0;

// ---------- Helpers ----------

const allSamples = () => [...data.samples, ...state.userSamples];
const userSampleIds = () => new Set(state.userSamples.map((s) => s.id));
const findSample = (id) => allSamples().find((s) => s.id === id);
const findLandmark = (id) => data.landmarks.find((l) => l.id === id);
const findObstacle = (id) => world.obstacles.find((o) => o.id === id);
const selectedRoute = () => state.routes.find((r) => r.ok && r.id === state.selectedRouteId) ?? null;

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4200);
}

// ---------- Paradas ----------

const sampleStop = (s) => ({ ref: `sample:${s.id}`, name: s.targetName, x: s.x, y: s.y });
const landmarkStop = (l) => ({ ref: `landmark:${l.id}`, name: l.name, x: l.x, y: l.y });
const pointStop = (x, y) => ({ name: `Ponto ${formatKmPosition(x, y, 4)}`, x, y });

function stopFromRef(ref) {
  const [kind, id] = [ref.slice(0, ref.indexOf(':')), ref.slice(ref.indexOf(':') + 1)];
  if (kind === 'sample') return findSample(id) && sampleStop(findSample(id));
  if (kind === 'landmark') return findLandmark(id) && landmarkStop(findLandmark(id));
  return null;
}

function stopOptions() {
  const ids = userSampleIds();
  const label = (s) => `${s.targetName} (${s.id})`;
  return {
    Marcos: data.landmarks.map((l) => ({ value: `landmark:${l.id}`, label: l.name })),
    'Pontos científicos': data.samples.map((s) => ({ value: `sample:${s.id}`, label: label(s) })),
    'Registrados por você': state.userSamples.filter((s) => ids.has(s.id)).map((s) => ({ value: `sample:${s.id}`, label: label(s) })),
  };
}

function overlayAsStop() {
  const o = state.overlay;
  if (!o) return null;
  if (o.type === 'sample') return sampleStop(findSample(o.id));
  if (o.type === 'landmark') return landmarkStop(findLandmark(o.id));
  if (o.type === 'obstacle') {
    const ob = findObstacle(o.id);
    return pointStop(ob.x, ob.y);
  }
  return pointStop(o.x, o.y);
}

// ---------- Rotas ----------

function computeRoutes({ fit = true } = {}) {
  const stops = state.stops.filter(Boolean);
  if (stops.length < 2) {
    state.routes = [];
    state.selectedRouteId = null;
    return;
  }
  state.routes = planAlternatives(world, stops, { count: 3 });
  state.selectedRouteId = state.routes[0]?.ok ? state.routes[0].id : null;
  if (fit && state.selectedRouteId != null) {
    map.fitBounds(boundsOf(state.routes.flatMap((r) => r.analysis.path)), { padding: 70 });
  }
}

function setStop(index, stop) {
  state.stops[index] = stop;
  // Conveniência: escolher só o destino parte da última posição conhecida do rover.
  if (index === state.stops.length - 1 && !state.stops[0]) {
    const origin = findLandmark('last-position') ?? data.landmarks[0];
    if (origin && stop?.ref !== `landmark:${origin.id}`) state.stops[0] = landmarkStop(origin);
  }
  computeRoutes();
}

function moveStop(from, to) {
  if (to < 0 || to >= state.stops.length || to === from) return false;
  const [stop] = state.stops.splice(from, 1);
  state.stops.splice(to, 0, stop);
  state.picking = -1;
  computeRoutes({ fit: false });
  render();
  $(`[data-drag-index="${to}"]`)?.focus();
  showToast(`Parada movida para a posição ${to + 1} de ${state.stops.length}`);
  return true;
}

// Arrastar pela alça (pointer events: mouse, toque e caneta). As outras linhas
// deslizam para abrir espaço; a ordem só muda de fato ao soltar.
function startStopDrag(e, handle) {
  if (e.button !== 0) return;
  const from = Number(handle.dataset.dragIndex);
  const rows = [...document.querySelectorAll('[data-stop-row]')];
  const row = rows[from];
  if (!row || rows.length < 2) return;
  e.preventDefault();
  const rects = rows.map((r) => r.getBoundingClientRect());
  const step = rects.length > 1 ? rects[1].top - rects[0].top : rects[0].height;
  const startY = e.clientY;
  let target = from;
  let moved = false;

  handle.setPointerCapture(e.pointerId);
  row.classList.add('is-dragging');

  const onMove = (ev) => {
    const dy = ev.clientY - startY;
    if (!moved && Math.abs(dy) < 4) return;
    moved = true;
    const minDy = rects[0].top - rects[from].top;
    const maxDy = rects.at(-1).top - rects[from].top;
    const clamped = Math.max(minDy, Math.min(maxDy, dy));
    row.style.transform = `translateY(${clamped}px)`;
    target = Math.max(0, Math.min(rows.length - 1, Math.round(from + clamped / step)));
    rows.forEach((r, j) => {
      if (j === from) return;
      const shift = from < j && j <= target ? -step : target <= j && j < from ? step : 0;
      r.style.transform = shift ? `translateY(${shift}px)` : '';
    });
  };
  const onEnd = (ev) => {
    handle.removeEventListener('pointermove', onMove);
    handle.removeEventListener('pointerup', onEnd);
    handle.removeEventListener('pointercancel', onEnd);
    rows.forEach((r) => (r.style.transform = ''));
    row.classList.remove('is-dragging');
    if (ev.type === 'pointerup' && moved) moveStop(from, target);
  };
  handle.addEventListener('pointermove', onMove);
  handle.addEventListener('pointerup', onEnd);
  handle.addEventListener('pointercancel', onEnd);
}

function goToRoutes() {
  state.tab = 'routes';
  state.overlay = null;
  state.placing = null;
}

// ---------- Renderização ----------

function render({ focus = false } = {}) {
  profile = null;
  document.querySelectorAll('[role="tab"]').forEach((tab) => {
    const active = tab.dataset.tab === state.tab;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $('#panel').innerHTML = panelHtml();
  afterRender();
  syncMap();
  if (focus) $('#panel [data-autofocus]')?.focus();
}

function panelHtml() {
  const o = state.overlay;
  const inRoutes = state.tab === 'routes' && !state.traverse;
  if (o?.type === 'point') {
    return T.placeTemplate({
      x: o.x,
      y: o.y,
      elevationM: elevationAt(world, o.x, o.y),
      slopeDeg: slopeAt(world, o.x, o.y),
      traversable: isTraversableAt(world, o.x, o.y),
      obstaclesHere: obstaclesAt(world, o.x, o.y, 0.02),
      inRoutes,
    });
  }
  if (o?.type === 'sample') return T.sampleTemplate({ sample: findSample(o.id), isUser: userSampleIds().has(o.id), inRoutes });
  if (o?.type === 'landmark') return T.landmarkTemplate({ landmark: findLandmark(o.id), inRoutes });
  if (o?.type === 'obstacle') {
    const obstacle = findObstacle(o.id);
    const onRoute = selectedRoute()?.analysis.obstacles.find((i) => i.obstacle.id === o.id);
    return T.obstacleTemplate({ obstacle, isUser: isUserObstacle(obstacle), inRoutes, onRoute });
  }
  if (o?.type === 'form-sample') return sampleFormHtml(o);
  if (o?.type === 'form-obstacle') return obstacleFormHtml(o);

  if (state.tab === 'routes') {
    if (state.traverse) return T.traverseTemplate({ traverse: state.traverse, route: state.traverse.route });
    return T.routesTemplate({
      stops: state.stops,
      options: stopOptions(),
      routes: state.routes,
      selectedRouteId: state.selectedRouteId,
      picking: state.picking,
    });
  }
  if (state.tab === 'history') return T.historyTemplate({ routes: state.history, previewId: state.historyPreviewId });
  return T.exploreTemplate({
    query: state.query,
    landmarks: data.landmarks,
    samples: allSamples(),
    obstacles: world.obstacles,
    openGroups: state.openGroups,
  });
}

function sampleFormHtml(o) {
  const { lon, lat } = kmToLonLat(o.x, o.y);
  const sol = Number(o.values?.sol ?? estimateMissionSol());
  const preview = createSample(
    { targetName: 'preview', type: o.values?.type ?? 'core', sol, lon, lat },
    { elevationM: elevationAt(world, o.x, o.y) },
    allSamples(),
  ).sample ?? { id: '—', ...toEastingNorthing(lon, lat) };
  return T.sampleFormTemplate({
    x: o.x,
    y: o.y,
    lon,
    lat,
    elevationM: elevationAt(world, o.x, o.y),
    defaultSol: estimateMissionSol(),
    preview,
    errors: o.errors,
    values: o.values,
  });
}

function obstacleFormHtml(o) {
  const { lon, lat } = kmToLonLat(o.x, o.y);
  return T.obstacleFormTemplate({
    x: o.x,
    y: o.y,
    lon,
    lat,
    elevationM: elevationAt(world, o.x, o.y),
    slopeDeg: slopeAt(world, o.x, o.y),
    previewId: nextUserObstacleId(world.obstacles),
    errors: o.errors,
    values: o.values,
  });
}

function afterRender() {
  const search = $('#search');
  search?.addEventListener('input', () => {
    state.query = search.value;
    const html = panelHtml();
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    $('#explore-results').replaceWith(tmp.querySelector('#explore-results'));
  });

  const canvas = $('#profile');
  const route = selectedRoute();
  if (canvas && route) {
    profile = new ElevationProfile(canvas, route.analysis.samples, {
      tooltip: $('#profile-tip'),
      onHover: (s) => map.set({ probe: s ? { x: s.x, y: s.y } : null }),
    });
  }

  // Formulário de empecilho: criticidade 5 sugere "intransponível" e atualiza a severidade padrão.
  const form = $('[data-form="obstacle"]');
  if (form) {
    const passable = form.elements.passable;
    passable.addEventListener('change', () => (passable.dataset.touched = '1'));
    form.addEventListener('change', (e) => {
      if (e.target.name !== 'criticality') return;
      const level = Number(e.target.value);
      if (!passable.dataset.touched) passable.checked = level < 5;
      form.elements.severity.placeholder = DEFAULT_SEVERITY[level];
    });
  }

  $('#tr-speed')?.addEventListener('change', (e) => (state.traverse.speed = Number(e.target.value)));
  $('#tr-follow')?.addEventListener('change', (e) => (state.traverse.follow = e.target.checked));
  if (state.traverse && (state.tab === 'routes' || state.traverse.status === 'running')) updateTraverseUi();
}

function syncMap() {
  const o = state.overlay;
  // Trajeto encerrado só continua no mapa na aba Rotas (até o usuário fechar).
  const active = state.traverse && ['running', 'paused'].includes(state.traverse.status);
  const traverse = active || state.tab === 'routes' ? state.traverse : null;
  if (!traverse) map.set({ traverse: null });
  const ids = userSampleIds();
  const markers = [
    ...data.landmarks.map((l) => ({ id: `landmark:${l.id}`, kind: 'landmark', x: l.x, y: l.y, name: l.name })),
    ...allSamples().map((s) => ({
      id: `sample:${s.id}`,
      kind: 'sample',
      x: s.x,
      y: s.y,
      name: s.targetName,
      color: SAMPLE_COLORS[s.type],
      user: ids.has(s.id),
    })),
  ];
  const routes = traverse ? [traverse.route] : state.routes.filter((r) => r.ok);
  const preview = state.tab === 'history' ? state.history.find((r) => r.id === state.historyPreviewId) : null;
  map.set({
    markers,
    stops: traverse ? traverse.route.stops : state.tab === 'routes' ? state.stops.filter(Boolean) : [],
    routes: state.tab === 'routes' || traverse ? routes : [],
    selectedRouteId: traverse ? traverse.route.id : state.selectedRouteId,
    historyPath: preview ? { path: preview.path, traveledPath: preview.traveledPath } : null,
    selectedMarkerId: o?.type === 'sample' || o?.type === 'landmark' ? `${o.type}:${o.id}` : null,
    selectedObstacleId: o?.type === 'obstacle' ? o.id : null,
    droppedPin: o && ['point', 'form-sample', 'form-obstacle'].includes(o.type) ? { x: o.x, y: o.y } : null,
    pickMode: state.picking >= 0 || Boolean(state.placing),
    probe: null,
  });

  const banner = $('#pick-banner');
  const text = state.placing
    ? `Clique no mapa para posicionar o novo ${state.placing === 'sample' ? 'ponto científico' : 'empecilho'} · Esc cancela`
    : state.picking >= 0
      ? `Clique no mapa para definir a parada ${T.LETTERS[state.picking]} · Esc cancela`
      : '';
  banner.hidden = !text;
  banner.textContent = text;
}

// ---------- Acompanhamento do trajeto ----------

function startTraverse() {
  const route = selectedRoute();
  if (!route) return;
  state.traverse = {
    route,
    sim: new TraverseSimulation(route.analysis),
    status: 'running',
    speed: 1,
    follow: true,
    warning: null,
    confirmStop: false,
    startedAt: new Date().toISOString(),
    originalStops: route.stops,
    plannedKm: route.analysis.distanceKm,
    offsetKm: 0,
    offsetHours: 0,
    reroutes: 0,
    traveledPath: [], // trechos já percorridos antes de cada recálculo
  };
  map.flyTo({ x: route.stops[0].x, y: route.stops[0].y, scale: Math.max(map.view.scale, 400) });
  render();
  resumeLoop();
}

function resumeLoop() {
  cancelAnimationFrame(frame);
  lastTick = performance.now();
  frame = requestAnimationFrame(tick);
}

function tick(now) {
  const tr = state.traverse;
  if (!tr || tr.status !== 'running') return;
  const dt = Math.min(0.25, (now - lastTick) / 1000);
  lastTick = now;
  const st = tr.sim.advance(dt * tr.speed);
  updateTraverseUi(st);
  if (st.done) finishTraverse('completed');
  else frame = requestAnimationFrame(tick);
}

function updateTraverseUi(st = state.traverse.sim.state()) {
  const tr = state.traverse;
  map.set({ traverse: { position: st.position, distanceKm: st.distanceKm } });
  if (tr.follow && tr.status === 'running') map.centerOn(st.position.x, st.position.y);
  const set = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  };
  set('tr-remaining-km', formatDistance(st.remainingKm));
  set('tr-remaining-h', `${formatDuration(st.remainingHours)}`);
  set('tr-done-km', formatDistance(tr.offsetKm + st.distanceKm));
  set('tr-elapsed-h', formatDuration(tr.offsetHours + st.elapsedHours));
  const bar = $('#tr-bar');
  if (bar) {
    bar.style.width = `${(st.progress * 100).toFixed(1)}%`;
    bar.parentElement.setAttribute('aria-valuenow', String(Math.round(st.progress * 100)));
  }
  const next = tr.route.analysis.steps.find((s) => s.alongStart > st.distanceKm + 1e-6);
  set('tr-next', next ? `${next.text} (em ${formatDistance(next.alongStart - st.distanceKm)})` : 'Chegada ao destino');
}

function finishTraverse(status) {
  cancelAnimationFrame(frame);
  const tr = state.traverse;
  const st = tr.sim.state();
  tr.status = status;
  tr.confirmStop = false;
  const traveledKm = tr.offsetKm + st.distanceKm;
  const elapsedHours = tr.offsetHours + st.elapsedHours;
  const traveledPath = [...tr.traveledPath, ...traveledPoints(tr.route.analysis.samples, st)];
  state.history.push({
    id: `r-${Date.now().toString(36)}`,
    createdAt: tr.startedAt,
    finishedAt: new Date().toISOString(),
    status,
    stops: tr.originalStops,
    path: [...tr.traveledPath, ...tr.route.analysis.path],
    traveledPath,
    distanceKm: tr.offsetKm + tr.route.analysis.distanceKm,
    traveledKm,
    driveHours: elapsedHours,
    elapsedHours,
    reroutes: tr.reroutes,
  });
  storage.saveRoutes(state.history);
  render();
  showToast(status === 'completed' ? 'Trajeto concluído e salvo no histórico.' : 'Trajeto interrompido e salvo no histórico.');
}

/** Pontos já percorridos da rota atual (amostras até a posição do rover). */
function traveledPoints(samples, st) {
  // 1 a cada 4 amostras (~100 m) basta para desenhar e mantém o localStorage pequeno.
  const done = samples.filter((s, i) => s.d <= st.distanceKm && i % 4 === 0);
  return [...done.map(({ x, y }) => ({ x, y })), { ...st.position }];
}

/** Depois de registrar um empecilho: a rota restante continua segura? */
function checkTraverseAfter(obstacle) {
  const tr = state.traverse;
  if (!tr || tr.status === 'completed' || tr.status === 'stopped') return false;
  const st = tr.sim.state();
  const blocked = firstBlockedAlong(world, tr.route.analysis.samples, st.distanceKm);
  if (blocked) {
    cancelAnimationFrame(frame);
    tr.status = 'paused';
    tr.warning = {
      message: `“${displayName(obstacle)}” (criticidade ${obstacle.criticality}) bloqueia a rota ${formatDistance(Math.max(0, blocked.d - st.distanceKm))} à frente. Trajeto pausado.`,
      canReroute: true,
    };
    return true;
  }
  const crosses = tr.route.analysis.samples.some(
    (s) => s.d >= st.distanceKm && Math.hypot(s.x - obstacle.x, s.y - obstacle.y) <= obstacle.r,
  );
  if (crosses) {
    tr.warning = {
      message: `A rota atravessa “${displayName(obstacle)}” (criticidade ${obstacle.criticality}). Recalcular pode evitá-lo.`,
      canReroute: true,
    };
    return true;
  }
  return false;
}

function reroute() {
  const tr = state.traverse;
  const st = tr.sim.state();
  const remaining = tr.route.stops.slice(st.legIndex + 1);
  const stops = [{ name: 'Posição atual do rover', x: st.position.x, y: st.position.y }, ...remaining];
  const route = planRoute(world, stops);
  if (!route.ok) {
    tr.warning = { message: `Não foi possível recalcular: ${route.reason}`, canReroute: false };
    render();
    return;
  }
  tr.traveledPath.push(...traveledPoints(tr.route.analysis.samples, st));
  route.id = `reroute-${tr.reroutes + 1}`;
  route.tags = [];
  tr.offsetKm += st.distanceKm;
  tr.offsetHours += st.elapsedHours;
  tr.route = route;
  tr.sim = new TraverseSimulation(route.analysis);
  tr.reroutes++;
  tr.warning = null;
  tr.status = 'running';
  render();
  resumeLoop();
}

// ---------- Registro de novos pontos ----------

function submitSample(form) {
  const f = new FormData(form);
  const x = Number(f.get('x'));
  const y = Number(f.get('y'));
  const { lon, lat } = kmToLonLat(x, y);
  const values = { targetName: f.get('targetName'), type: f.get('type'), sol: f.get('sol') };
  const result = createSample(
    { ...values, sol: values.sol === '' ? NaN : Number(values.sol), lon, lat },
    { elevationM: elevationAt(world, x, y) },
    allSamples(),
  );
  if (result.errors) {
    state.overlay = { ...state.overlay, values, errors: result.errors };
    render({ focus: true });
    return;
  }
  const sample = result.sample;
  state.userSamples.push(sample);
  if (!storage.saveUserSamples(state.userSamples)) showToast('Registrado, mas não foi possível salvar no navegador.');
  state.overlay = { type: 'sample', id: sample.id };
  render({ focus: true });
  showToast(`Ponto científico ${sample.id} registrado.`);
}

function submitObstacle(form) {
  const f = new FormData(form);
  const x = Number(f.get('x'));
  const y = Number(f.get('y'));
  const { lon, lat } = kmToLonLat(x, y);
  const values = {
    name: f.get('name'),
    type: f.get('type'),
    criticality: f.get('criticality'),
    passable: f.get('passable') === 'on',
    radiusM: f.get('radiusM'),
    severity: f.get('severity'),
    slopeDeg: f.get('slopeDeg'),
    description: f.get('description'),
  };
  const result = createUserObstacle(
    {
      ...values,
      lat,
      lon,
      radiusM: values.radiusM === '' ? NaN : Number(values.radiusM),
      severity: values.severity === '' ? undefined : Number(values.severity),
      slopeDeg: values.slopeDeg === '' ? undefined : Number(values.slopeDeg),
    },
    { elevationM: elevationAt(world, x, y), slopeDeg: slopeAt(world, x, y) },
    world.obstacles,
  );
  if (result.errors) {
    state.overlay = { ...state.overlay, values, errors: result.errors };
    render({ focus: true });
    return;
  }
  const obstacle = result.obstacle;
  addObstacle(world, obstacle);
  persistUserObstacles();
  state.overlay = null;
  if (checkTraverseAfter(obstacle)) {
    state.tab = 'routes';
    showToast('Empecilho registrado — afeta o trajeto em andamento.');
  } else if (state.routes.length && !state.traverse) {
    computeRoutes({ fit: false });
    state.tab = 'routes';
    showToast('Empecilho registrado. Rotas recalculadas.');
  } else {
    state.overlay = { type: 'obstacle', id: obstacle.id };
    showToast(`Empecilho ${obstacle.id} registrado.`);
  }
  render({ focus: true });
}

function persistUserObstacles() {
  if (!storage.saveUserObstacles(world.obstacles.filter(isUserObstacle))) {
    showToast('Não foi possível salvar no navegador.');
  }
}

function openForm(kind, x, y) {
  if (!isInsideMap(x, y)) return;
  state.placing = null;
  state.overlay = { type: kind === 'sample' ? 'form-sample' : 'form-obstacle', x, y };
  render({ focus: true });
}

// ---------- Ações do painel ----------

const actions = {
  back: () => {
    state.overlay = null;
    render({ focus: true });
  },
  'open-sample': (el) => openOverlay({ type: 'sample', id: el.dataset.id }),
  'open-landmark': (el) => openOverlay({ type: 'landmark', id: el.dataset.id }),
  'open-obstacle': (el) => openOverlay({ type: 'obstacle', id: el.dataset.id }),
  'start-placing': (el) => {
    state.placing = el.dataset.kind;
    syncMap();
    $('#map').focus();
  },
  'new-sample-here': () => openForm('sample', state.overlay.x, state.overlay.y),
  'new-obstacle-here': () => openForm('obstacle', state.overlay.x, state.overlay.y),
  'route-to': () => {
    const stop = overlayAsStop();
    goToRoutes();
    setStop(state.stops.length - 1, stop);
    render({ focus: true });
  },
  'route-from': () => {
    const stop = overlayAsStop();
    goToRoutes();
    setStop(0, stop);
    render({ focus: true });
  },
  'add-as-stop': () => {
    const stop = overlayAsStop();
    const empty = state.stops.indexOf(null);
    if (empty >= 0) state.stops[empty] = stop;
    else if (state.stops.length < T.LETTERS.length) state.stops.push(stop);
    goToRoutes();
    computeRoutes();
    render();
  },
  'pick-stop': (el) => {
    const index = Number(el.dataset.index);
    state.picking = state.picking === index ? -1 : index;
    render();
    if (state.picking >= 0) $('#map').focus();
  },
  'add-stop': () => {
    state.stops.push(null);
    render();
  },
  'remove-stop': (el) => {
    state.stops.splice(Number(el.dataset.index), 1);
    state.picking = -1;
    computeRoutes();
    render();
  },
  'swap-stops': () => {
    state.stops.reverse();
    computeRoutes({ fit: false });
    render();
  },
  'clear-route': () => {
    state.stops = [null, null];
    state.routes = [];
    state.selectedRouteId = null;
    state.picking = -1;
    render({ focus: true });
  },
  'select-route': (el) => {
    state.selectedRouteId = Number(el.dataset.id);
    render();
  },
  'save-route': () => {
    const route = selectedRoute();
    state.history.push({
      id: `r-${Date.now().toString(36)}`,
      createdAt: new Date().toISOString(),
      status: 'planned',
      stops: route.stops,
      path: route.analysis.path,
      distanceKm: route.analysis.distanceKm,
      driveHours: route.analysis.driveHours,
      reroutes: 0,
    });
    storage.saveRoutes(state.history);
    showToast('Rota salva no histórico.');
  },
  'start-traverse': () => startTraverse(),
  'pause-traverse': () => {
    cancelAnimationFrame(frame);
    state.traverse.status = 'paused';
    render();
  },
  'resume-traverse': () => {
    state.traverse.status = 'running';
    state.traverse.warning = null;
    render();
    resumeLoop();
  },
  'stop-traverse': () => {
    state.traverse.confirmStop = true;
    render();
    $('[data-action="cancel-stop"]')?.focus();
  },
  'cancel-stop': () => {
    state.traverse.confirmStop = false;
    render();
  },
  'confirm-stop': () => finishTraverse('stopped'),
  'close-traverse': () => {
    state.traverse = null;
    map.set({ traverse: null });
    render();
  },
  reroute: () => reroute(),
  'delete-sample': (el) => {
    const id = el.dataset.id;
    state.userSamples = state.userSamples.filter((s) => s.id !== id);
    storage.saveUserSamples(state.userSamples);
    state.stops = state.stops.map((s) => (s?.ref === `sample:${id}` ? null : s));
    state.overlay = null;
    render();
  },
  'delete-obstacle': (el) => {
    const id = el.dataset.id;
    removeObstacle(world, id);
    persistUserObstacles();
    state.overlay = null;
    if (state.routes.length && !state.traverse) computeRoutes({ fit: false });
    render();
  },
  'preview-history': (el) => {
    const id = el.dataset.id;
    state.historyPreviewId = state.historyPreviewId === id ? null : id;
    const r = state.history.find((h) => h.id === id);
    render();
    if (state.historyPreviewId && r) map.fitBounds(boundsOf(r.path), { padding: 70 });
  },
  'replay-history': (el) => {
    const r = state.history.find((h) => h.id === el.dataset.id);
    state.stops = r.stops.map((s) => (s.ref ? stopFromRef(s.ref) ?? { ...s } : { ...s }));
    state.historyPreviewId = null;
    goToRoutes();
    computeRoutes();
    render();
  },
  'delete-history': (el) => {
    state.history = state.history.filter((h) => h.id !== el.dataset.id);
    storage.saveRoutes(state.history);
    render();
  },
};

function openOverlay(overlay) {
  state.overlay = overlay;
  render({ focus: true });
  const target =
    overlay.type === 'sample' ? findSample(overlay.id) : overlay.type === 'landmark' ? findLandmark(overlay.id) : findObstacle(overlay.id);
  if (target) map.flyTo({ x: target.x, y: target.y, scale: Math.max(map.view.scale, overlay.type === 'obstacle' ? Math.min(3000, 0.12 / Math.max(target.r, 0.01) * 400) : 400) });
}

// ---------- Mapa ----------

function onHit(hit) {
  closeContextMenu();
  if (state.placing || state.picking >= 0) {
    const p = hit.type === 'marker' ? hit.marker : hit.type === 'obstacle' ? hit.obstacle : null;
    if (p) onMapClick({ x: p.x, y: p.y, marker: hit.marker });
    return;
  }
  if (hit.type === 'route') {
    state.selectedRouteId = hit.route.id;
    render();
    return;
  }
  if (hit.type === 'obstacle') {
    state.overlay = { type: 'obstacle', id: hit.obstacle.id };
  } else {
    const [type, id] = [hit.marker.id.slice(0, hit.marker.id.indexOf(':')), hit.marker.id.slice(hit.marker.id.indexOf(':') + 1)];
    state.overlay = { type, id };
  }
  render({ focus: true });
}

function onMapClick({ x, y, marker }) {
  if (!$('#context-menu').hidden) {
    closeContextMenu();
    return;
  }
  if (!isInsideMap(x, y)) return;
  if (state.placing) {
    openForm(state.placing, x, y);
    return;
  }
  if (state.picking >= 0) {
    const index = state.picking;
    state.picking = -1;
    const ref = marker?.id;
    setStop(index, (ref && stopFromRef(ref)) || pointStop(x, y));
    render();
    return;
  }
  if (state.tab === 'routes' && !state.overlay) return; // não perde a rota com um clique acidental
  state.overlay = { type: 'point', x, y };
  render();
}

/** Conteúdo da prévia para o que está sob o mouse, ou null se não houver foto. */
function previewFor(hit) {
  if (hit?.type === 'marker' && hit.marker.kind === 'sample') {
    const id = hit.marker.id.slice('sample:'.length);
    const sample = userSampleIds().has(id) ? null : findSample(id);
    if (!sample) return null;
    return {
      key: hit.marker.id,
      html: `${T.samplePhoto(sample, 'map-preview-photo')}<strong>${T.esc(sample.targetName)}</strong><small>Sol ${T.esc(sample.sol)}</small>`,
    };
  }
  if (hit?.type === 'obstacle') {
    const o = hit.obstacle;
    const figure = T.obstaclePhotoFigure(o, 'map-preview-photo');
    if (!figure) return null;
    return {
      key: `obstacle:${o.id}:${o.criticality}`,
      html: `${figure}<strong>${T.esc(displayName(o))}</strong><small>Criticidade ${T.esc(o.criticality)}</small>`,
    };
  }
  return null;
}

/** Cartão com a foto do ponto científico ou do empecilho sob o mouse. */
function showMapPreview(hit, screen) {
  const el = $('#map-preview');
  const preview = previewFor(hit);
  if (!preview) {
    el.hidden = true;
    delete el.dataset.key;
    return;
  }
  if (el.dataset.key !== preview.key) {
    el.dataset.key = preview.key;
    el.innerHTML = preview.html;
  }
  el.hidden = false;
  // Abre para o lado com mais espaço, para não sair da tela.
  // parentElement, não offsetParent: este é null quando o CSS esconde a prévia (telas sem hover).
  const area = el.parentElement.getBoundingClientRect();
  const flipX = screen.x + 16 + el.offsetWidth > area.width;
  const flipY = screen.y + 16 + el.offsetHeight > area.height;
  el.style.left = `${flipX ? screen.x - 16 - el.offsetWidth : screen.x + 16}px`;
  el.style.top = `${flipY ? Math.max(8, screen.y - 16 - el.offsetHeight) : screen.y + 16}px`;
}

function onHover(point, hit, screen) {
  showMapPreview(hit, screen);
  const el = $('#coords');
  if (!point || !isInsideMap(point.x, point.y)) {
    el.textContent = '';
    return;
  }
  const here = obstaclesAt(world, point.x, point.y, 0.005);
  el.textContent = `${formatKmPosition(point.x, point.y)} · ${formatElevation(elevationAt(world, point.x, point.y))} · ${formatNumber(slopeAt(world, point.x, point.y), 0)}°${here.length ? ` · ${here[0].name} (crit. ${here[0].criticality})` : ''}`;
}

function openContextMenu({ x, y, sx, sy }) {
  if (!isInsideMap(x, y)) return;
  const menu = $('#context-menu');
  const items = [
    ['inspect', 'O que há aqui?'],
    ...(state.traverse ? [] : [['from', 'Rota a partir daqui'], ['to', 'Rota até aqui']]),
    ...(state.tab === 'routes' && !state.traverse ? [['stop', 'Adicionar parada aqui']] : []),
    ['sample', 'Registrar ponto científico aqui'],
    ['obstacle', 'Registrar empecilho aqui'],
  ];
  menu.innerHTML = `<p class="menu-coords">${T.esc(formatKmPosition(x, y))}</p>${items
    .map(([id, label]) => `<button role="menuitem" data-menu="${id}">${label}</button>`)
    .join('')}`;
  menu.hidden = false;
  menu.dataset.x = x;
  menu.dataset.y = y;
  const area = $('.map-area').getBoundingClientRect();
  const rect = menu.getBoundingClientRect();
  menu.style.left = `${Math.min(sx, area.width - rect.width - 8)}px`;
  menu.style.top = `${Math.min(sy, area.height - rect.height - 8)}px`;
  menu.querySelector('button')?.focus();
}

function closeContextMenu() {
  $('#context-menu').hidden = true;
}

function onContextMenuAction(id, x, y) {
  closeContextMenu();
  if (id === 'sample' || id === 'obstacle') return openForm(id, x, y);
  state.overlay = { type: 'point', x, y };
  if (id === 'inspect') return render();
  actions[{ from: 'route-from', to: 'route-to', stop: 'add-as-stop' }[id]]();
}

function computeInsets() {
  const sidebar = $('#sidebar').getBoundingClientRect();
  const area = $('.map-area').getBoundingClientRect();
  if (window.matchMedia('(max-width: 720px)').matches) {
    return { left: 0, right: 0, top: 0, bottom: Math.max(0, area.bottom - sidebar.top) };
  }
  return { left: Math.max(0, sidebar.right - area.left), right: 0, top: 0, bottom: 0 };
}

// ---------- Inicialização ----------

function bindGlobalEvents() {
  const panel = $('#panel');
  panel.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (el && actions[el.dataset.action]) actions[el.dataset.action](el);
  });
  // Lembra quais acordeões o usuário abriu. Usa o clique no <summary> (também disparado
  // por Enter/Espaço) em vez de 'toggle', que dispara até na abertura automática da busca.
  panel.addEventListener('click', (e) => {
    const summary = e.target.closest('details[data-group] > summary');
    if (!summary || state.query.trim()) return;
    const group = summary.parentElement;
    const level = Number(group.dataset.group);
    // O clique roda antes de o navegador alternar `open`: o novo estado é o inverso.
    if (group.open) state.openGroups.delete(level);
    else state.openGroups.add(level);
  });
  panel.addEventListener('pointerdown', (e) => {
    const handle = e.target.closest('[data-drag-index]');
    if (handle) startStopDrag(e, handle);
  });
  panel.addEventListener('keydown', (e) => {
    const handle = e.target.closest('[data-drag-index]');
    const delta = { ArrowUp: -1, ArrowDown: 1 }[e.key];
    if (!handle || !delta) return;
    e.preventDefault();
    const from = Number(handle.dataset.dragIndex);
    moveStop(from, from + delta);
  });
  panel.addEventListener('change', (e) => {
    const select = e.target.closest('select[data-stop-index]');
    if (!select || select.value === '__point') return;
    const index = Number(select.dataset.stopIndex);
    setStop(index, select.value ? stopFromRef(select.value) : null);
    render();
    $(`#stop-${index}`)?.focus();
  });
  panel.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-form]');
    if (!form) return;
    e.preventDefault();
    if (form.dataset.form === 'sample') submitSample(form);
    else submitObstacle(form);
  });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      state.tab = tab.dataset.tab;
      state.overlay = null;
      state.placing = null;
      state.picking = -1;
      render();
    });
    tab.addEventListener('keydown', (e) => {
      const delta = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (!delta) return;
      const next = tabs[(i + delta + tabs.length) % tabs.length];
      next.focus();
      next.click();
    });
  });

  $('#context-menu').addEventListener('click', (e) => {
    const button = e.target.closest('[data-menu]');
    if (!button) return;
    const menu = $('#context-menu');
    onContextMenuAction(button.dataset.menu, Number(menu.dataset.x), Number(menu.dataset.y));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!$('#context-menu').hidden) closeContextMenu();
    else if (state.placing || state.picking >= 0) {
      state.placing = null;
      state.picking = -1;
      render();
    } else if (!$('#layers-panel').hidden) toggleLayers(false);
  });

  $('#zoom-in').addEventListener('click', () => map.zoomBy(1.6));
  $('#zoom-out').addEventListener('click', () => map.zoomBy(1 / 1.6));
  $('#recenter').addEventListener('click', () => map.fitAll());
  $('#layers-toggle').addEventListener('click', () => toggleLayers());
  $('#layers-panel').addEventListener('change', (e) => {
    const t = e.target;
    if (t.name === 'base') map.setBase(t.value);
    else if (t.dataset.layer) map.setLayer(t.dataset.layer, t.checked);
  });
  window.addEventListener('resize', () => profile?.resize());
}

function toggleLayers(force) {
  const panel = $('#layers-panel');
  const open = force ?? panel.hidden;
  panel.hidden = !open;
  $('#layers-toggle').setAttribute('aria-expanded', String(open));
}

async function init() {
  const readText = async (p) => {
    const res = await fetch(p);
    if (!res.ok) throw new Error(`${p}: HTTP ${res.status}`);
    return res.text();
  };
  const readBinary = async (p) => {
    const res = await fetch(p);
    if (!res.ok) throw new Error(`${p}: HTTP ${res.status}`);
    return res.arrayBuffer();
  };
  const [loaded, satellite] = await Promise.all([
    loadDatasets({ readText, readBinary }),
    loadImage(DATA_FILES.satelliteImage).catch(() => null),
  ]);
  data = loaded;
  world = createWorld({ dem: data.dem, obstacles: [...data.obstacles, ...storage.loadUserObstacles()] });
  state.userSamples = storage.loadUserSamples().filter((s) => !data.samples.some((b) => b.id === s.id));
  state.history = storage.loadRoutes();

  const relief = renderRelief(world);
  map = new MapView($('#map'), world, { satellite, relief: relief.canvas, slope: renderSlope(world) }, {
    onHit,
    onMapClick,
    onHover,
    onContextMenu: openContextMenu,
    onInteractionStart: closeContextMenu,
    onUserPan: () => {
      if (state.traverse?.follow) {
        state.traverse.follow = false;
        const box = $('#tr-follow');
        if (box) box.checked = false;
      }
    },
  });
  map.getInsets = computeInsets;
  document.querySelector(`#layers-panel input[name="base"][value="${map.base}"]`).checked = true;
  if (!satellite) {
    document.querySelector('#layers-panel input[name="base"][value="satellite"]').disabled = true;
    showToast('Imagem de satélite indisponível; exibindo relevo.');
  }
  for (const input of document.querySelectorAll('#layers-panel input[data-layer]')) {
    input.checked = map.layers[input.dataset.layer];
  }

  bindGlobalEvents();
  render();
  // Abre focado na região explorada pelo rover (onde estão os dados).
  map.fitBounds(boundsOf([...data.samples, ...data.landmarks]), { padding: 60, animate: false });
  $('#loading').remove();
  if (data.errors.length) showToast(`${data.errors.length} registro(s) inválido(s) ignorado(s) nos datasets.`);
}

requestAnimationFrame(() =>
  setTimeout(() =>
    init().catch((error) => {
      $('#loading').textContent = `Falha ao carregar os dados: ${error.message}`;
      console.error(error);
    }),
  ),
);
