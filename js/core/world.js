// "Mundo" navegável: DEM real reamostrado na grade de 50 m, declividade,
// empecilhos do dataset e a grade de custo usada pelo A*.

import { clamp } from '../lib/math.js';
import { GRID_WIDTH, GRID_HEIGHT, CELL_KM, kmToLonLat } from './geo.js';

/** Acima desta declividade (no DEM de 200 m) o terreno é intransponível. */
export const MAX_SLOPE_DEG = 25;
/** Dentro de um empecilho transponível o custo é multiplicado por 1 + K·severidade. */
export const PASSABLE_PENALTY = 4;
/** Folga extra ao redor de empecilhos intransponíveis, por criticidade (km). */
export const BLOCK_MARGIN_KM = Object.freeze({ 1: 0.01, 2: 0.015, 3: 0.02, 4: 0.03, 5: 0.05 });

/** Custo relativo de avançar 1 unidade de distância numa encosta. */
export function terrainCost(slopeDeg) {
  return 1 + 0.5 * (slopeDeg / 8) ** 2;
}

// ---------- DEM ----------

/** Elevação bilinear (m) do DEM em lon/lat. */
export function demElevation(dem, lon, lat) {
  const u = clamp((lon - dem.west) / dem.degPerPixelX - 0.5, 0, dem.width - 1);
  const v = clamp((dem.north - lat) / dem.degPerPixelY - 0.5, 0, dem.height - 1);
  const i0 = Math.floor(u);
  const j0 = Math.floor(v);
  const i1 = Math.min(i0 + 1, dem.width - 1);
  const j1 = Math.min(j0 + 1, dem.height - 1);
  const fx = u - i0;
  const fy = v - j0;
  const h = dem.values;
  const top = h[j0 * dem.width + i0] * (1 - fx) + h[j0 * dem.width + i1] * fx;
  const bottom = h[j1 * dem.width + i0] * (1 - fx) + h[j1 * dem.width + i1] * fx;
  return top * (1 - fy) + bottom * fy;
}

// ---------- Construção ----------

export function createWorld({ dem, obstacles = [] }) {
  const width = GRID_WIDTH;
  const height = GRID_HEIGHT;
  const elevation = new Float32Array(width * height);
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const { lon, lat } = kmToLonLat((i + 0.5) * CELL_KM, (j + 0.5) * CELL_KM);
      elevation[j * width + i] = demElevation(dem, lon, lat);
    }
  }
  const world = {
    width,
    height,
    cellKm: CELL_KM,
    dem,
    elevation,
    slope: computeSlope(elevation, width, height),
    obstacles: [...obstacles],
    blocked: new Uint8Array(width * height),
    penalty: new Float32Array(width * height),
    cost: new Float32Array(width * height),
  };
  rebuildCost(world);
  return world;
}

function computeSlope(elevation, width, height) {
  const cellM = CELL_KM * 1000;
  const slope = new Float32Array(width * height);
  for (let j = 0; j < height; j++) {
    const ju = Math.max(0, j - 1);
    const jd = Math.min(height - 1, j + 1);
    for (let i = 0; i < width; i++) {
      const il = Math.max(0, i - 1);
      const ir = Math.min(width - 1, i + 1);
      const dzdx = (elevation[j * width + ir] - elevation[j * width + il]) / ((ir - il) * cellM);
      const dzdy = (elevation[jd * width + i] - elevation[ju * width + i]) / ((jd - ju) * cellM);
      slope[j * width + i] = (Math.atan(Math.hypot(dzdx, dzdy)) * 180) / Math.PI;
    }
  }
  return slope;
}

function forEachCellInCircle(world, x, y, r, fn) {
  const { width, height, cellKm } = world;
  const i0 = Math.max(0, Math.floor((x - r) / cellKm));
  const i1 = Math.min(width - 1, Math.floor((x + r) / cellKm));
  const j0 = Math.max(0, Math.floor((y - r) / cellKm));
  const j1 = Math.min(height - 1, Math.floor((y + r) / cellKm));
  for (let j = j0; j <= j1; j++) {
    for (let i = i0; i <= i1; i++) {
      if (Math.hypot((i + 0.5) * cellKm - x, (j + 0.5) * cellKm - y) <= r) fn(j * width + i);
    }
  }
  // Empecilhos menores que uma célula (ex.: 14 m) ainda marcam a célula do centro.
  const ci = Math.floor(x / cellKm);
  const cj = Math.floor(y / cellKm);
  if (ci >= 0 && ci < width && cj >= 0 && cj < height) fn(cj * width + ci);
}

/** Recalcula bloqueios, penalidades e custos (após criar ou remover empecilhos). */
export function rebuildCost(world) {
  const { blocked, penalty, cost, slope } = world;
  blocked.fill(0);
  penalty.fill(1);
  for (const o of world.obstacles) {
    if (o.passable) {
      const factor = 1 + PASSABLE_PENALTY * o.severity;
      forEachCellInCircle(world, o.x, o.y, o.r, (k) => {
        if (factor > penalty[k]) penalty[k] = factor;
      });
    } else {
      forEachCellInCircle(world, o.x, o.y, o.r + BLOCK_MARGIN_KM[o.criticality], (k) => {
        blocked[k] = 1;
      });
    }
  }
  for (let k = 0; k < cost.length; k++) {
    cost[k] = blocked[k] || slope[k] > MAX_SLOPE_DEG ? Infinity : terrainCost(slope[k]) * penalty[k];
  }
}

export function addObstacle(world, obstacle) {
  world.obstacles.push(obstacle);
  rebuildCost(world);
}

export function removeObstacle(world, id) {
  world.obstacles = world.obstacles.filter((o) => o.id !== id);
  rebuildCost(world);
}

// ---------- Consultas ----------

export function gridOf(world) {
  return { width: world.width, height: world.height, cost: world.cost };
}

export function cellIndexAt(world, x, y) {
  const i = clamp(Math.floor(x / world.cellKm), 0, world.width - 1);
  const j = clamp(Math.floor(y / world.cellKm), 0, world.height - 1);
  return j * world.width + i;
}

export function cellCenter(world, index) {
  return {
    x: ((index % world.width) + 0.5) * world.cellKm,
    y: (Math.floor(index / world.width) + 0.5) * world.cellKm,
  };
}

export function elevationAt(world, x, y) {
  const { lon, lat } = kmToLonLat(x, y);
  return demElevation(world.dem, lon, lat);
}

export function slopeAt(world, x, y) {
  return world.slope[cellIndexAt(world, x, y)];
}

export function isTraversableAt(world, x, y) {
  return Number.isFinite(world.cost[cellIndexAt(world, x, y)]);
}

/** Custo efetivo (terreno × empecilhos transponíveis) no ponto; ignora bloqueios. */
export function travelCostAt(world, x, y) {
  const k = cellIndexAt(world, x, y);
  return terrainCost(world.slope[k]) * world.penalty[k];
}

/** Empecilhos cujo círculo contém o ponto (mais crítico primeiro). */
export function obstaclesAt(world, x, y, toleranceKm = 0) {
  return world.obstacles
    .filter((o) => Math.hypot(o.x - x, o.y - y) <= o.r + toleranceKm)
    .sort((a, b) => b.criticality - a.criticality);
}
