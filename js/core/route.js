// Planejamento de rotas (com paradas e alternativas) e análise:
// distância, tempo, perfil de elevação, empecilhos próximos e instruções.

import { closestPointOnSegment, angleDelta } from '../lib/math.js';
import { headingDeg, cardinal } from './geo.js';
import { findPath, smoothPath, nearestTraversable } from './pathfinding.js';
import { cellCenter, cellIndexAt, elevationAt, gridOf, slopeAt, travelCostAt } from './world.js';

/** Velocidade média de condução autônoma do Perseverance (~150 m/h). */
export const ROVER_SPEED_KMH = 0.15;
/** Horas de condução disponíveis por sol. */
export const DRIVE_HOURS_PER_SOL = 4.5;
/** Empecilhos a menos desta distância da rota entram no relatório. */
export const HAZARD_REPORT_KM = 0.15;
const SAMPLE_STEP_KM = 0.025;
const SNAP_RADIUS_CELLS = 40;

/**
 * @param stops {{x, y, name}[]} paradas em ordem
 * @param options.cost grade de custo alternativa (usada para gerar rotas alternativas)
 */
export function planRoute(world, stops, { cost } = {}) {
  if (stops.length < 2) return { ok: false, reason: 'Defina ao menos uma partida e um destino.' };
  const grid = cost ? { ...gridOf(world), cost } : gridOf(world);

  const snapped = [];
  for (const stop of stops) {
    const original = cellIndexAt(world, stop.x, stop.y);
    const index = nearestTraversable(gridOf(world), original, SNAP_RADIUS_CELLS);
    if (index < 0) return { ok: false, reason: `"${stop.name}" está cercado por terreno intransponível.` };
    const moved = index !== original;
    snapped.push({ stop, index, moved, point: moved ? cellCenter(world, index) : { x: stop.x, y: stop.y } });
  }

  const legs = [];
  for (let k = 0; k < snapped.length - 1; k++) {
    const from = snapped[k];
    const to = snapped[k + 1];
    const cells = findPath(grid, from.index, to.index);
    if (!cells) return { ok: false, reason: `Não há caminho seguro entre "${from.stop.name}" e "${to.stop.name}".` };
    const points = smoothPath(grid, cells).map((p) => ({ x: p.x * world.cellKm, y: p.y * world.cellKm }));
    points[0] = { ...from.point };
    if (points.length === 1) points.push({ ...to.point });
    else points[points.length - 1] = { ...to.point };
    legs.push({ from: from.stop, to: to.stop, points });
  }

  const adjustments = snapped
    .filter((s) => s.moved)
    .map((s) => ({ name: s.stop.name, km: Math.hypot(s.point.x - s.stop.x, s.point.y - s.stop.y) }));

  const route = { ok: true, stops, legs, adjustments };
  route.analysis = analyzeRoute(world, route);
  return route;
}

// ---------- Rotas alternativas ----------

const ALTERNATIVE_CORRIDOR_KM = 0.2;
const ALTERNATIVE_PENALTY = 3;
const MAX_OVERLAP = 0.6;
const MAX_DETOUR_FACTOR = 1.8;

/**
 * Até `count` rotas distintas, pelo método de penalização: depois de achar uma
 * rota, encarecemos o "corredor" dela e buscamos de novo. Rotas que repetem
 * mais de 60% do trajeto de outra, ou que são muito mais longas, são descartadas.
 */
export function planAlternatives(world, stops, { count = 3 } = {}) {
  const best = planRoute(world, stops);
  if (!best.ok) return [best];
  const routes = [best];
  const cost = Float32Array.from(world.cost);

  for (let attempt = 0; routes.length < count && attempt < count * 2; attempt++) {
    penalizeCorridor(world, cost, routes[routes.length - 1].analysis.samples);
    const candidate = planRoute(world, stops, { cost });
    if (!candidate.ok) break;
    const a = candidate.analysis;
    if (a.driveHours > best.analysis.driveHours * MAX_DETOUR_FACTOR) break;
    if (routes.every((r) => overlap(a.samples, r.analysis.path) < MAX_OVERLAP)) routes.push(candidate);
  }
  return labelRoutes(routes);
}

function penalizeCorridor(world, cost, samples) {
  const { width, height, cellKm } = world;
  const radius = Math.ceil(ALTERNATIVE_CORRIDOR_KM / cellKm);
  const touched = new Set();
  for (const s of samples) {
    const ci = Math.floor(s.x / cellKm);
    const cj = Math.floor(s.y / cellKm);
    for (let dj = -radius; dj <= radius; dj++) {
      for (let di = -radius; di <= radius; di++) {
        const i = ci + di;
        const j = cj + dj;
        if (i < 0 || j < 0 || i >= width || j >= height || di * di + dj * dj > radius * radius) continue;
        touched.add(j * width + i);
      }
    }
  }
  for (const k of touched) if (Number.isFinite(cost[k])) cost[k] *= ALTERNATIVE_PENALTY;
}

/** Fração das amostras de uma rota que ficam a menos de 100 m de outra. */
function overlap(samples, path) {
  let near = 0;
  for (const s of samples) {
    for (let i = 1; i < path.length; i++) {
      if (closestPointOnSegment(s.x, s.y, path[i - 1].x, path[i - 1].y, path[i].x, path[i].y).dist < 0.1) {
        near++;
        break;
      }
    }
  }
  return near / samples.length;
}

function labelRoutes(routes) {
  const pick = (fn) => routes.reduce((best, r) => (fn(r) < fn(best) ? r : best), routes[0]);
  const fastest = pick((r) => r.analysis.driveHours);
  const shortest = pick((r) => r.analysis.distanceKm);
  const safest = pick((r) => r.analysis.exposure.score);
  routes.forEach((r, i) => {
    r.id = i;
    r.tags = [];
    if (r === fastest) r.tags.push('Mais rápida');
    if (r === shortest) r.tags.push('Mais curta');
    if (r === safest && routes.length > 1) r.tags.push('Menos exposta');
  });
  return routes;
}

// ---------- Análise ----------

export function analyzeRoute(world, route) {
  const path = route.legs.flatMap((leg, i) => (i === 0 ? leg.points : leg.points.slice(1)));
  const cumulative = [0];
  for (let i = 1; i < path.length; i++) {
    cumulative.push(cumulative[i - 1] + Math.hypot(path[i].x - path[i - 1].x, path[i].y - path[i - 1].y));
  }
  const legEndsKm = [];
  let acc = 0;
  for (const leg of route.legs) {
    for (let i = 1; i < leg.points.length; i++) {
      acc += Math.hypot(leg.points[i].x - leg.points[i - 1].x, leg.points[i].y - leg.points[i - 1].y);
    }
    legEndsKm.push(acc);
  }

  const samples = sampleRoute(world, path, cumulative);
  let ascentM = 0;
  let descentM = 0;
  let maxSlopeDeg = 0;
  for (let i = 1; i < samples.length; i++) {
    const de = samples[i].e - samples[i - 1].e;
    if (de > 0) ascentM += de;
    else descentM -= de;
    maxSlopeDeg = Math.max(maxSlopeDeg, samples[i].slope);
  }

  const obstacles = obstaclesAlongRoute(world, path, cumulative);
  const driveHours = samples[samples.length - 1].t;

  return {
    path,
    distanceKm: cumulative[cumulative.length - 1],
    legEndsKm,
    driveHours,
    sols: Math.max(1, Math.ceil(driveHours / DRIVE_HOURS_PER_SOL)),
    ascentM,
    descentM,
    maxSlopeDeg,
    samples,
    obstacles,
    exposure: exposureOf(obstacles),
    steps: buildDirections(route.legs, obstacles),
    bounds: boundsOf(path),
  };
}

/** Amostras a cada 25 m com distância (d, km), tempo acumulado (t, h), elevação e declive. */
function sampleRoute(world, path, cumulative) {
  const samples = [];
  let t = 0;
  const push = (x, y, d) => {
    const prev = samples[samples.length - 1];
    if (prev) t += ((d - prev.d) * travelCostAt(world, (x + prev.x) / 2, (y + prev.y) / 2)) / ROVER_SPEED_KMH;
    samples.push({ d, t, x, y, e: elevationAt(world, x, y), slope: slopeAt(world, x, y) });
  };
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1];
    const b = path[i];
    const length = cumulative[i] - cumulative[i - 1];
    const n = Math.max(1, Math.ceil(length / SAMPLE_STEP_KM));
    for (let s = 0; s < n; s++) {
      const f = s / n;
      push(a.x + (b.x - a.x) * f, a.y + (b.y - a.y) * f, cumulative[i - 1] + length * f);
    }
  }
  const last = path[path.length - 1];
  push(last.x, last.y, cumulative[cumulative.length - 1]);
  return samples;
}

export function boundsOf(points) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    minY = Math.min(minY, p.y);
    maxX = Math.max(maxX, p.x);
    maxY = Math.max(maxY, p.y);
  }
  return { minX, minY, maxX, maxY };
}

/** Empecilhos próximos: folga (0 = atravessa), posição ao longo do trajeto e lado. */
function obstaclesAlongRoute(world, path, cumulative) {
  const box = boundsOf(path);
  const found = [];
  for (const obstacle of world.obstacles) {
    const margin = obstacle.r + HAZARD_REPORT_KM;
    if (obstacle.x < box.minX - margin || obstacle.x > box.maxX + margin) continue;
    if (obstacle.y < box.minY - margin || obstacle.y > box.maxY + margin) continue;

    let best = null;
    for (let i = 1; i < path.length; i++) {
      const a = path[i - 1];
      const b = path[i];
      const hit = closestPointOnSegment(obstacle.x, obstacle.y, a.x, a.y, b.x, b.y);
      const clearance = hit.dist - obstacle.r;
      if (!best || clearance < best.clearance) {
        const cross = (b.x - a.x) * (obstacle.y - hit.y) - (b.y - a.y) * (obstacle.x - hit.x);
        best = {
          clearance,
          along: cumulative[i - 1] + (cumulative[i] - cumulative[i - 1]) * hit.t,
          // y cresce para o sul: produto vetorial > 0 = à direita.
          side: cross > 0 ? 'direita' : 'esquerda',
        };
      }
    }
    if (best && best.clearance < HAZARD_REPORT_KM) {
      found.push({
        obstacle,
        clearanceKm: Math.max(0, best.clearance),
        crossed: best.clearance <= 0,
        alongKm: best.along,
        side: best.side,
      });
    }
  }
  return found.sort((a, b) => a.alongKm - b.alongKm);
}

/** Exposição a risco: empecilhos atravessados pesam mais que os apenas próximos. */
function exposureOf(items) {
  const crossed = items.filter((i) => i.crossed);
  const maxCriticality = items.reduce((m, i) => Math.max(m, i.obstacle.criticality), 0);
  const score = items.reduce(
    (sum, i) => sum + i.obstacle.criticality * i.obstacle.severity * (i.crossed ? 1 : 0.25),
    0,
  );
  return { crossed: crossed.length, near: items.length - crossed.length, maxCriticality, score };
}

// ---------- Instruções ----------

const MERGE_ANGLE_DEG = 20;
const MIN_SEGMENT_KM = 0.02;

function groupSegments(points) {
  const groups = [];
  let current = null;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    if (length < 1e-6) continue;
    const heading = headingDeg(b.x - a.x, b.y - a.y);
    const continues =
      current && (length < MIN_SEGMENT_KM || Math.abs(angleDelta(current.lastHeading, heading)) < MERGE_ANGLE_DEG);
    if (continues) {
      current.end = b;
      current.lengthKm += length;
      current.lastHeading = heading;
    } else {
      current = { start: a, end: b, lengthKm: length, lastHeading: heading };
      groups.push(current);
    }
  }
  for (const g of groups) g.heading = headingDeg(g.end.x - g.start.x, g.end.y - g.start.y);
  return groups;
}

function describeTurn(fromHeading, toHeading) {
  const delta = angleDelta(fromHeading, toHeading);
  const side = delta > 0 ? 'direita' : 'esquerda';
  const dir = delta > 0 ? 'right' : 'left';
  const abs = Math.abs(delta);
  if (abs < 45) return { kind: `slight-${dir}`, verb: `Curva suave à ${side}` };
  if (abs < 135) return { kind: dir, verb: `Vire à ${side}` };
  return { kind: `sharp-${dir}`, verb: `Curva fechada à ${side}` };
}

function buildDirections(legs, obstacles) {
  const steps = [];
  let along = 0;
  legs.forEach((leg, legIndex) => {
    const groups = groupSegments(leg.points);
    groups.forEach((group, i) => {
      const direction = cardinal(group.heading);
      let kind = 'depart';
      let text;
      if (i === 0) {
        text =
          legIndex === 0
            ? `Saia de ${leg.from.name} rumo ao ${direction}`
            : `Retome a partir de ${leg.from.name} rumo ao ${direction}`;
      } else {
        const turn = describeTurn(groups[i - 1].heading, group.heading);
        kind = turn.kind;
        text = `${turn.verb} e siga rumo ao ${direction}`;
      }
      steps.push({ kind, text, distanceKm: group.lengthKm, at: group.start, alongStart: along, alongEnd: along + group.lengthKm, notes: [] });
      along += group.lengthKm;
    });
    const isLast = legIndex === legs.length - 1;
    steps.push({
      kind: isLast ? 'arrive' : 'waypoint',
      text: isLast ? `Chegue a ${leg.to.name}` : `Parada em ${leg.to.name}`,
      distanceKm: 0,
      at: leg.points[leg.points.length - 1],
      alongStart: along,
      alongEnd: along,
      notes: [],
    });
  });

  for (const item of obstacles) {
    const step =
      steps.find((s) => s.distanceKm > 0 && item.alongKm >= s.alongStart && item.alongKm <= s.alongEnd) ?? steps[0];
    step.notes.push(item);
  }
  return steps;
}

// ---------- Utilidades para acompanhamento ----------

/** Primeiro ponto (a partir de `fromKm`) em que a rota cruza terreno agora intransponível. */
export function firstBlockedAlong(world, samples, fromKm = 0) {
  for (const s of samples) {
    if (s.d < fromKm) continue;
    if (!Number.isFinite(world.cost[cellIndexAt(world, s.x, s.y)])) return s;
  }
  return null;
}
