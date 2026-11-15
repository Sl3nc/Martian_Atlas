// Templates HTML do painel lateral. Funções puras: recebem dados, devolvem HTML.
// Todo texto vindo de dados/usuário passa por esc().

import {
  formatDistance,
  formatDuration,
  formatElevation,
  formatKmPosition,
  formatLonLat,
  formatNumber,
} from '../core/geo.js';
import { DRIVE_HOURS_PER_SOL } from '../core/route.js';
import { CRITICALITY, OBSTACLE_TYPES, DEFAULT_SEVERITY, displayName, obstaclePhoto } from '../model/obstacles.js';
import { SAMPLE_TYPES, sampleImageUrl } from '../model/samples.js';
import { SAMPLE_COLORS } from './mapView.js';

export const LETTERS = 'ABCDEFGHIJ';

export const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const sols = (hours) => {
  const n = Math.max(1, Math.ceil(hours / DRIVE_HOURS_PER_SOL));
  return `${n} ${n === 1 ? 'sol' : 'sóis'}`;
};

export function criticalityBadge(level, { long = false } = {}) {
  const c = CRITICALITY[level];
  return `<span class="crit crit-${level}" style="--c:${c.color}" title="Criticidade ${level}: ${c.label}">${level}${long ? ` · ${c.label}` : ''}</span>`;
}

const fact = (label, value) => `<div><dt>${esc(label)}</dt><dd>${value}</dd></div>`;

// ---------- Explorar ----------

function sampleItem(s) {
  return `
    <li>
      <button class="list-item" data-action="open-sample" data-id="${esc(s.id)}">
        <span class="diamond" style="--c:${SAMPLE_COLORS[s.type] ?? '#ccc'}" aria-hidden="true"></span>
        <span class="list-text">
          <strong>${esc(s.targetName)}</strong>
          <small>${esc(SAMPLE_TYPES[s.type] ?? s.type)} · Sol ${s.sol}</small>
        </span>
      </button>
    </li>`;
}

function obstacleItem(o, detail = typeLabel(o)) {
  return `
    <li>
      <button class="list-item" data-action="open-obstacle" data-id="${esc(o.id)}">
        ${criticalityBadge(o.criticality)}
        <span class="list-text">
          <strong>${esc(displayName(o))}${o.isDynamic ? ' <em class="tag">dinâmico</em>' : ''}</strong>
          <small>${detail}</small>
        </span>
      </button>
    </li>`;
}

/** Acordeão (details nativo) com os empecilhos de um nível de criticidade. */
function obstacleGroup(level, items, openGroups, searching) {
  if (!items.length) return '';
  const open = searching || openGroups.has(level);
  return `
    <details class="accordion" data-group="${level}" ${open ? 'open' : ''}>
      <summary>${criticalityBadge(level, { long: true })}<span class="accordion-count">${items.length}</span></summary>
      <ul class="list">${items.map((o) => obstacleItem(o)).join('')}</ul>
    </details>`;
}

export function exploreTemplate({ query, landmarks, samples, obstacles, openGroups }) {
  const q = query.trim().toLocaleLowerCase('pt-BR');
  const match = (...texts) => !q || texts.join(' ').toLocaleLowerCase('pt-BR').includes(q);
  const ls = landmarks.filter((l) => match(l.name, l.description));
  const ss = samples.filter((s) => match(s.targetName, s.id, s.type, SAMPLE_TYPES[s.type]));
  const cs = obstacles.filter((o) => match(o.name, displayName(o), o.id, o.description));
  const empty = '<p class="muted">Nada encontrado.</p>';
  return `
    <div class="search-row" role="search">
      <label class="visually-hidden" for="search">Buscar pontos e empecilhos</label>
      <input id="search" type="search" placeholder="Buscar amostras, marcos, empecilhos…" autocomplete="off" value="${esc(query)}" data-autofocus>
    </div>
    <div class="quick-actions">
      <button class="btn small" data-action="start-placing" data-kind="sample">+ Ponto científico</button>
      <button class="btn small" data-action="start-placing" data-kind="obstacle">+ Empecilho</button>
    </div>
    <div id="explore-results">
      <section><h2 class="section-title">Marcos</h2>
        ${ls.length ? `<ul class="list">${ls.map((l) => `
          <li><button class="list-item" data-action="open-landmark" data-id="${esc(l.id)}">
            <span class="landmark-dot" aria-hidden="true"></span>
            <span class="list-text"><strong>${esc(l.name)}</strong><small>${esc(formatLonLat(l.lon, l.lat, 4))}</small></span>
          </button></li>`).join('')}</ul>` : empty}
      </section>
      <section><h2 class="section-title">Pontos científicos (${ss.length})</h2>
        ${ss.length ? `<ul class="list">${ss.map((s) => sampleItem(s)).join('')}</ul>` : empty}
      </section>
      <section><h2 class="section-title">Empecilhos mapeados (${cs.length})</h2>
        ${cs.length ? [5, 4, 3, 2, 1].map((level) => obstacleGroup(level, cs.filter((o) => o.criticality === level), openGroups, !!q)).join('') : empty}
      </section>
    </div>`;
}

// ---------- Detalhes ----------

const routeActions = (inRoutes) => `
  <div class="actions">
    <button class="btn primary" data-action="route-to">Rota até aqui</button>
    <button class="btn" data-action="route-from">Partir daqui</button>
    ${inRoutes ? '<button class="btn" data-action="add-as-stop">Adicionar como parada</button>' : ''}
  </div>`;

export function placeTemplate({ x, y, elevationM, slopeDeg, traversable, obstaclesHere, inRoutes }) {
  return `
    <button class="back-btn" data-action="back">← Voltar</button>
    <article class="place">
      <h2 class="place-title" tabindex="-1" data-autofocus>Ponto selecionado</h2>
      <dl class="facts">
        ${fact('Coordenadas', esc(formatKmPosition(x, y)))}
        ${fact('Elevação (DEM)', formatElevation(elevationM))}
        ${fact('Declividade (DEM)', `${formatNumber(slopeDeg, 1)}°`)}
        ${fact('Trafegável', traversable ? 'Sim' : '<span class="warn">Não — área de risco</span>')}
      </dl>
      ${obstaclesHere.length ? `<h3 class="section-title">Empecilhos neste local</h3><ul class="list">${obstaclesHere.map((o) => obstacleItem(o)).join('')}</ul>` : ''}
      ${routeActions(inRoutes)}
      <div class="actions">
        <button class="btn" data-action="new-sample-here">Registrar ponto científico</button>
        <button class="btn warn-btn" data-action="new-obstacle-here">Registrar empecilho</button>
      </div>
    </article>`;
}

/** Some sem deixar buraco se a foto não existir. */
export const samplePhoto = (s, className = 'sample-photo') => `
  <figure class="${className}">
    <img src="${esc(sampleImageUrl(s))}" alt="Alvo ${esc(s.targetName)}, amostrado no sol ${esc(s.sol)}" onerror="this.parentElement.remove()" />
  </figure>`;

/** Foto ilustrativa do nível de criticidade; a legenda deixa claro que não é o próprio empecilho. */
export function obstaclePhotoFigure(o, className = 'sample-photo') {
  const photo = obstaclePhoto(o);
  if (!photo) return '';
  return `
  <figure class="${className}">
    <img src="${esc(photo.url)}" alt="Cena de exemplo para criticidade ${esc(o.criticality)}" onerror="this.parentElement.remove()" />
    <figcaption>Foto ilustrativa · Hazcam, sol ${esc(photo.sol)}</figcaption>
  </figure>`;
}

export function sampleTemplate({ sample, isUser, inRoutes }) {
  return `
    <button class="back-btn" data-action="back">← Voltar</button>
    <article class="place">
      <h2 class="place-title" tabindex="-1" data-autofocus>${esc(sample.targetName)}</h2>
      <span class="chip" style="--c:${SAMPLE_COLORS[sample.type] ?? '#ccc'}">${esc(SAMPLE_TYPES[sample.type] ?? sample.type)}</span>
      ${isUser ? '<span class="chip" style="--c:#ffffff">Registrado por você</span>' : ''}
      ${isUser ? '' : samplePhoto(sample)}
      <dl class="facts">
        ${fact('sample_id', esc(sample.id))}
        ${fact('Sol', esc(sample.sol))}
        ${fact('Coordenadas', esc(formatLonLat(sample.lon, sample.lat, 6)))}
        ${fact('Elevação', formatElevation(sample.elevationM))}
        ${fact('Easting / Northing', `${formatNumber(sample.easting, 1)} / ${formatNumber(sample.northing, 1)}`)}
      </dl>
      ${routeActions(inRoutes)}
      ${isUser ? `<button class="btn danger" data-action="delete-sample" data-id="${esc(sample.id)}">Excluir ponto</button>` : ''}
    </article>`;
}

export function landmarkTemplate({ landmark, inRoutes }) {
  return `
    <button class="back-btn" data-action="back">← Voltar</button>
    <article class="place">
      <h2 class="place-title" tabindex="-1" data-autofocus>${esc(landmark.name)}</h2>
      <p>${esc(landmark.description)}</p>
      <dl class="facts">${fact('Coordenadas', esc(formatLonLat(landmark.lon, landmark.lat, 4)))}</dl>
      ${routeActions(inRoutes)}
    </article>`;
}

/** Tipo do empecilho; só os intransponíveis recebem a observação. */
const typeLabel = (o) => `${esc(OBSTACLE_TYPES[o.type])}${o.passable ? '' : ' <span class="warn">(intransponível)</span>'}`;

export function obstacleTemplate({ obstacle: o, isUser, inRoutes, onRoute }) {
  const c = CRITICALITY[o.criticality];
  return `
    <button class="back-btn" data-action="back">← Voltar</button>
    <article class="place">
      <h2 class="place-title" tabindex="-1" data-autofocus>${esc(displayName(o))}</h2>
      <div class="crit-banner" style="--c:${c.color}">
        ${criticalityBadge(o.criticality, { long: true })}
        <span>${esc(c.hint)}</span>
      </div>
      ${onRoute ? `<p class="note">Este empecilho está a ${formatDistance(onRoute.clearanceKm)} da rota selecionada (km ${formatNumber(onRoute.alongKm, 2)}).</p>` : ''}
      ${obstaclePhotoFigure(o)}
      ${o.description ? `<p>${esc(o.description)}</p>` : ''}
      <dl class="facts">
        ${fact('Tipo', esc(OBSTACLE_TYPES[o.type]))}
        ${o.passable ? '' : fact('Transponível pelo rover', '<span class="warn">Não</span>')}
        ${fact('Raio', `${formatNumber(o.radiusM, 0)} m`)}
        ${fact('Inclinação', `${formatNumber(o.slopeDeg, 1)}°`)}
        ${fact('Severidade', formatNumber(o.severity, 2))}
        ${fact('Elevação', formatElevation(o.elevationM))}
        ${fact('Coordenadas', esc(formatLonLat(o.lon, o.lat, 5)))}
        ${fact('Fonte', esc(o.sourceDataset))}
        ${fact('Relato dinâmico', o.isDynamic ? 'Sim' : 'Não')}
        ${fact('obstacle_id', `<code>${esc(o.id)}</code>`)}
      </dl>
      ${inRoutes ? '' : ''}
      ${isUser ? `<button class="btn danger" data-action="delete-obstacle" data-id="${esc(o.id)}">Excluir empecilho</button>` : ''}
    </article>`;
}

// ---------- Formulários de registro ----------

const errorList = (errors) =>
  errors?.length ? `<div class="alert" role="alert"><strong>Corrija:</strong><ul>${errors.map((e) => `<li>${esc(e)}</li>`).join('')}</ul></div>` : '';

export function sampleFormTemplate({ x, y, lon, lat, elevationM, defaultSol, preview, errors, values = {} }) {
  return `
    <button class="back-btn" data-action="back">← Cancelar</button>
    <h2 class="place-title" tabindex="-1" data-autofocus>Novo ponto científico</h2>
    <p class="muted">Segue o modelo de <code>M2020_amostras_armazenadas.csv</code>. Campos derivados são calculados automaticamente.</p>
    ${errorList(errors)}
    <form class="form" data-form="sample" novalidate>
      <label>Nome do alvo (target_name)
        <input name="targetName" required maxlength="60" value="${esc(values.targetName ?? '')}" placeholder="Ex.: Cheyava Falls">
      </label>
      <label>Tipo (type)
        <select name="type">${Object.entries(SAMPLE_TYPES).map(([k, v]) => `<option value="${k}" ${values.type === k ? 'selected' : ''}>${esc(k)} — ${esc(v)}</option>`).join('')}</select>
      </label>
      <label>Sol
        <input name="sol" type="number" min="0" step="1" required value="${esc(values.sol ?? defaultSol)}">
        <small class="muted">Padrão: sol atual estimado da missão.</small>
      </label>
      <dl class="facts compact">
        ${fact('sample_id (previsto)', `<code>${esc(preview.id)}</code>`)}
        ${fact('latitude / longitude', esc(`${formatNumber(lat, 6)} / ${formatNumber(lon, 6)}`))}
        ${fact('elevation (DEM)', formatElevation(elevationM))}
        ${fact('easting / northing', `${formatNumber(preview.easting, 1)} / ${formatNumber(preview.northing, 1)}`)}
      </dl>
      <input type="hidden" name="x" value="${x}"><input type="hidden" name="y" value="${y}">
      <button class="btn primary" type="submit">Registrar ponto científico</button>
    </form>`;
}

export function obstacleFormTemplate({ x, y, lon, lat, elevationM, slopeDeg, previewId, errors, values = {} }) {
  const criticality = Number(values.criticality ?? 3);
  const passable = values.passable ?? criticality < 5;
  return `
    <button class="back-btn" data-action="back">← Cancelar</button>
    <h2 class="place-title" tabindex="-1" data-autofocus>Novo empecilho</h2>
    <p class="muted">Segue o modelo de <code>jezero_obstacles_v2_clean.csv</code> como relato dinâmico. A rota é recalculada na hora.</p>
    ${errorList(errors)}
    <form class="form" data-form="obstacle" novalidate>
      <label>Nome (name)
        <input name="name" required maxlength="80" value="${esc(values.name ?? '')}" placeholder="Ex.: Bloco solto na subida">
      </label>
      <label>Tipo (obstacle_type)
        <select name="type">${Object.entries(OBSTACLE_TYPES).map(([k, v]) => `<option value="${k}" ${(values.type ?? 'boulder_field') === k ? 'selected' : ''}>${esc(v)} (${k})</option>`).join('')}</select>
      </label>
      <fieldset class="crit-picker">
        <legend>Criticidade (criticality_level)</legend>
        ${[1, 2, 3, 4, 5].map((n) => `
          <label class="crit-option" style="--c:${CRITICALITY[n].color}">
            <input type="radio" name="criticality" value="${n}" ${n === criticality ? 'checked' : ''}>
            <span class="crit-num">${n}</span><span class="crit-text"><strong>${CRITICALITY[n].label}</strong><small>${esc(CRITICALITY[n].hint)}</small></span>
          </label>`).join('')}
      </fieldset>
      <label class="check"><input type="checkbox" name="passable" ${passable ? 'checked' : ''}> Transponível pelo rover (passable_by_rover)</label>
      <div class="form-row">
        <label>Raio (m)
          <input name="radiusM" type="number" min="1" max="5000" step="1" required value="${esc(values.radiusM ?? 50)}">
        </label>
        <label>Severidade (0–1)
          <input name="severity" type="number" min="0" max="1" step="0.01" value="${esc(values.severity ?? '')}" placeholder="${DEFAULT_SEVERITY[criticality]}">
        </label>
        <label>Inclinação (°)
          <input name="slopeDeg" type="number" min="0" max="90" step="0.1" value="${esc(values.slopeDeg ?? formatNumber(slopeDeg, 1).replace(',', '.'))}">
        </label>
      </div>
      <label>Descrição
        <textarea name="description" rows="3" maxlength="400">${esc(values.description ?? '')}</textarea>
      </label>
      <dl class="facts compact">
        ${fact('obstacle_id (previsto)', `<code>${esc(previewId)}</code>`)}
        ${fact('lat / lon', esc(`${formatNumber(lat, 6)} / ${formatNumber(lon, 6)}`))}
        ${fact('elevation_m (DEM)', formatElevation(elevationM))}
        ${fact('source_dataset', 'User_Dynamic_Hazard_Report')}
      </dl>
      <input type="hidden" name="x" value="${x}"><input type="hidden" name="y" value="${y}">
      <button class="btn primary" type="submit">Registrar empecilho</button>
    </form>`;
}

// ---------- Rotas ----------

function stopRow(stop, index, { options, picking, count }) {
  const letter = LETTERS[index];
  const option = (o) => `<option value="${esc(o.value)}" ${stop?.ref === o.value ? 'selected' : ''}>${esc(o.label)}</option>`;
  const groups = Object.entries(options)
    .filter(([, list]) => list.length)
    .map(([label, list]) => `<optgroup label="${esc(label)}">${list.map(option).join('')}</optgroup>`)
    .join('');
  return `
    <li class="stop ${picking === index ? 'is-picking' : ''}" data-stop-row="${index}">
      <button class="stop-handle" data-drag-index="${index}" aria-label="Reordenar parada ${letter}: arraste ou use as setas ↑ ↓" title="Arraste para reordenar">⠿</button>
      <span class="stop-badge ${index === 0 ? 'start' : ''}" aria-hidden="true">${index === 0 ? '' : letter}</span>
      <label class="visually-hidden" for="stop-${index}">Parada ${letter}</label>
      <select id="stop-${index}" data-stop-index="${index}" ${index === 0 ? 'data-autofocus' : ''}>
        <option value="" ${stop ? '' : 'selected'}>${index === 0 ? 'Escolha a partida…' : 'Escolha o destino…'}</option>
        ${stop && !stop.ref ? `<option value="__point" selected>📍 ${esc(stop.name)}</option>` : ''}
        ${groups}
      </select>
      <button class="icon-btn" data-action="pick-stop" data-index="${index}" aria-pressed="${picking === index}" aria-label="Escolher parada ${letter} no mapa" title="Escolher no mapa">⌖</button>
      ${count > 2 ? `<button class="icon-btn" data-action="remove-stop" data-index="${index}" aria-label="Remover parada ${letter}" title="Remover">✕</button>` : ''}
    </li>`;
}

function alternativeCard(route, selected) {
  const a = route.analysis;
  return `
    <li>
      <button class="alt-card ${selected ? 'selected' : ''}" data-action="select-route" data-id="${route.id}" aria-pressed="${selected}">
        <span class="alt-head">
          <strong>${formatDuration(a.driveHours)}</strong>
          <span>${formatDistance(a.distanceKm)} · ${sols(a.driveHours)}</span>
        </span>
        <span class="alt-tags">${route.tags.map((t) => `<em class="tag">${esc(t)}</em>`).join('')}</span>
        <span class="chips">
          <span class="chip-hazard" title="Soma de criticidade × severidade de cada empecilho; os apenas próximos pesam ¼. Menor = menos exposta.">Exposição: ${formatNumber(a.exposure.score, 1)} pontos</span>
          <span>▲ ${formatElevation(a.ascentM)} ▼ ${formatElevation(a.descentM)}</span>
          <span>Declive máx. ${formatNumber(a.maxSlopeDeg, 0)}°</span>
          <span>${a.obstacles.length} empecilho${a.obstacles.length === 1 ? '' : 's'} no caminho</span>
        </span>
      </button>
    </li>`;
}

export function routesTemplate({ stops, options, routes, selectedRouteId, picking }) {
  const failed = routes.length === 1 && !routes[0].ok ? routes[0] : null;
  const selected = routes.find((r) => r.ok && r.id === selectedRouteId);
  return `
    <ol class="stops">${stops.map((s, i) => stopRow(s, i, { options, picking, count: stops.length })).join('')}</ol>
    <div class="stop-tools">
      <button class="btn small" data-action="add-stop" ${stops.length >= LETTERS.length ? 'disabled' : ''}>+ Parada</button>
      <button class="btn small" data-action="swap-stops">⇅ Inverter</button>
      <button class="btn small ghost" data-action="clear-route">Limpar</button>
    </div>
    <div aria-live="polite">
      ${failed ? `<div class="alert" role="alert">${esc(failed.reason)}</div>` : ''}
      ${routes.length && !failed ? `
        <h3 class="section-title">Rotas possíveis (${routes.length})</h3>
        <ul class="alts">${routes.map((r) => alternativeCard(r, r.id === selectedRouteId)).join('')}</ul>` : ''}
      ${selected ? routeDetailTemplate(selected) : ''}
    </div>`;
}

export function routeDetailTemplate(route) {
  const a = route.analysis;
  return `
    <div class="route-actions">
      ${route.adjustments.map((adj) => `<p class="note">“${esc(adj.name)}” estava em área de risco; ponto ajustado em ${formatDistance(adj.km)}.</p>`).join('')}
      <div class="actions">
        <button class="btn primary" data-action="start-traverse">▶ Iniciar trajeto</button>
        <button class="btn" data-action="save-route">Salvar rota</button>
      </div>
    </div>
    <section><h3 class="section-title">Perfil de elevação (DEM 200 m)</h3>
      <div class="profile"><canvas id="profile" aria-label="Perfil de elevação da rota"></canvas><div id="profile-tip" class="profile-tip" hidden></div></div>
    </section>
    <section><h3 class="section-title">Empecilhos próximos da rota</h3>
      ${a.obstacles.length ? `<ul class="list">${a.obstacles.map((i) => obstacleItem(i.obstacle, `${esc(OBSTACLE_TYPES[i.obstacle.type])}, ${i.crossed ? 'na rota' : `${formatNumber(i.clearanceKm * 1000, 0)} metros da rota`}`)).join('')}</ul>` : '<p class="muted">Nenhum empecilho a menos de 150 m da rota.</p>'}
    </section>`;
}

// ---------- Acompanhamento ----------

export const SPEEDS = Object.freeze([
  { value: 0.25, label: '1 s = 15 min' },
  { value: 1, label: '1 s = 1 h' },
  { value: 4, label: '1 s = 4 h' },
  { value: 12, label: '1 s = 12 h' },
]);

export function traverseTemplate({ traverse, route }) {
  const { status, speed, follow, warning, confirmStop } = traverse;
  const finished = status === 'completed' || status === 'stopped';
  return `
    <div class="traverse">
      <h2 class="traverse-title">${esc(route.stops.map((s) => s.name).join(' → '))}</h2>
      <div class="traverse-status status-${status}">
        ${{ running: '● Em percurso', paused: '❚❚ Pausado', completed: '✓ Trajeto concluído', stopped: '■ Trajeto interrompido' }[status]}
      </div>
      <div class="progress" role="progressbar" aria-label="Progresso do trajeto" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span id="tr-bar"></span></div>
      <dl class="metrics">
        <div><dt>Distância restante</dt><dd id="tr-remaining-km">–</dd></div>
        <div><dt>Tempo restante</dt><dd id="tr-remaining-h">–</dd></div>
        <div><dt>Percorrido</dt><dd id="tr-done-km">–</dd></div>
        <div><dt>Tempo de trajeto</dt><dd id="tr-elapsed-h">–</dd></div>
      </dl>
      <p class="next-step"><span class="muted">Próxima instrução:</span> <strong id="tr-next">–</strong></p>
      ${warning ? `<div class="alert" role="alert">${esc(warning.message)}${warning.canReroute ? '<div class="actions"><button class="btn primary" data-action="reroute">Recalcular rota a partir daqui</button></div>' : ''}</div>` : ''}
      ${finished ? `
        <div class="actions"><button class="btn primary" data-action="close-traverse">Fechar</button></div>` : `
        <div class="actions">
          ${status === 'running' ? '<button class="btn" data-action="pause-traverse">❚❚ Pausar</button>' : '<button class="btn primary" data-action="resume-traverse">▶ Retomar</button>'}
          <span class="vsep" aria-hidden="true"></span>
          ${confirmStop ? `
            <span class="confirm">
              <button class="btn danger" data-action="confirm-stop">Confirmar</button>
              <button class="btn ghost" data-action="cancel-stop">Voltar</button>
            </span>` : '<button class="btn danger" data-action="stop-traverse">■ Parar</button>'}
        </div>
        <div class="form-row traverse-options">
          <label>Velocidade da simulação
            <select id="tr-speed">${SPEEDS.map((s) => `<option value="${s.value}" ${s.value === speed ? 'selected' : ''}>${s.label}</option>`).join('')}</select>
          </label>
          <label class="check"><input type="checkbox" id="tr-follow" ${follow ? 'checked' : ''}> Seguir o rover</label>
        </div>
        <p class="hint">Encontrou algo inesperado? Clique com o botão direito no mapa.</p>`}
    </div>`;
}

// ---------- Histórico e registro ----------

const STATUS_LABEL = { planned: 'Planejada', completed: 'Concluída', stopped: 'Interrompida' };
const dateFmt = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
const formatDate = (iso) => dateFmt.format(new Date(iso));

export function historyTemplate({ routes, previewId }) {
  if (!routes.length) return '<p class="empty">Nenhuma rota salva ainda. Rotas concluídas ou interrompidas entram aqui automaticamente; rotas planejadas, pelo botão “Salvar rota”.</p>';
  return `<ul class="history">${[...routes].reverse().map((r) => `
    <li class="history-item ${r.id === previewId ? 'selected' : ''}">
      <div class="history-head">
        <span class="status-pill status-${r.status}">${STATUS_LABEL[r.status]}</span>
        <small class="muted">${esc(formatDate(r.finishedAt ?? r.createdAt))}</small>
      </div>
      <strong>${esc(r.stops.map((s) => s.name).join(' → '))}</strong>
      <small>${formatDistance(r.distanceKm)} planejados${r.traveledKm != null ? ` · ${formatDistance(r.traveledKm)} percorridos` : ''} · ${formatDuration(r.elapsedHours ?? r.driveHours)}${r.reroutes ? ` · ${r.reroutes} recálculo(s)` : ''}</small>
      <div class="actions">
        <button class="btn small" data-action="preview-history" data-id="${esc(r.id)}">${r.id === previewId ? 'Ocultar do mapa' : 'Ver no mapa'}</button>
        <button class="btn small" data-action="replay-history" data-id="${esc(r.id)}">Refazer rota</button>
        <button class="btn small ghost" data-action="delete-history" data-id="${esc(r.id)}" aria-label="Excluir rota salva">Excluir</button>
      </div>
    </li>`).join('')}</ul>`;
}
