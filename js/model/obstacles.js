// Modelo de empecilhos ("pontos críticos"), espelhando as colunas de
// data/jezero_obstacles_v2_clean.csv. Toda leitura e escrita passa por aqui.

import { lonLatToKm } from '../core/geo.js';

export const OBSTACLE_COLUMNS = Object.freeze([
  'obstacle_id',
  'name',
  'source_dataset',
  'lat',
  'lon',
  'elevation_m',
  'obstacle_type',
  'radius_meters',
  'slope_deg',
  'severity_score',
  'criticality_level',
  'passable_by_rover',
  'is_dynamic_report',
  'description',
]);

export const OBSTACLE_TYPES = Object.freeze({
  crater: 'Cratera',
  sand_trap: 'Armadilha de areia',
  steep_slope: 'Encosta íngreme',
  boulder_field: 'Campo de matacões',
  rough_terrain: 'Terreno irregular',
});

export const CRITICALITY = Object.freeze({
  1: { label: 'Baixa', color: '#6fcf7c', hint: 'Atenção mínima; tráfego normal.' },
  2: { label: 'Moderada', color: '#c9de55', hint: 'Reduzir velocidade.' },
  3: { label: 'Significativa', color: '#ffc23d', hint: 'Travessia lenta e monitorada.' },
  4: { label: 'Alta', color: '#ff8a3d', hint: 'Evitar sempre que possível.' },
  5: { label: 'Crítica', color: '#ff4d5e', hint: 'Intransponível; desvio obrigatório.' },
});

/** Severidade padrão por criticidade (ponto médio observado no dataset). */
export const DEFAULT_SEVERITY = Object.freeze({ 1: 0.35, 2: 0.43, 3: 0.6, 4: 0.75, 5: 0.9 });

export const USER_SOURCE_DATASET = 'User_Dynamic_Hazard_Report';
const USER_ID_PREFIX = 'DYNAMIC_USER_';

const parseBool = (value) => String(value).trim().toLowerCase() === 'true';

/** Linha do CSV → objeto tipado usado pelo app. Lança erro se inválida. */
export function parseObstacle(row) {
  const obstacle = {
    id: String(row.obstacle_id ?? '').trim(),
    name: String(row.name ?? '').trim(),
    sourceDataset: String(row.source_dataset ?? '').trim(),
    lat: Number(row.lat),
    lon: Number(row.lon),
    elevationM: Number(row.elevation_m),
    type: String(row.obstacle_type ?? '').trim(),
    radiusM: Number(row.radius_meters),
    slopeDeg: Number(row.slope_deg),
    severity: Number(row.severity_score),
    criticality: Number(row.criticality_level),
    passable: parseBool(row.passable_by_rover),
    isDynamic: parseBool(row.is_dynamic_report),
    description: String(row.description ?? '').trim(),
  };
  const errors = validateObstacle(obstacle);
  if (errors.length) throw new Error(`Empecilho "${obstacle.id || '?'}" inválido: ${errors.join('; ')}`);
  return withLocalCoordinates(obstacle);
}

export function validateObstacle(o) {
  const errors = [];
  if (!o.id) errors.push('obstacle_id vazio');
  if (!o.name) errors.push('name vazio');
  if (!o.sourceDataset) errors.push('source_dataset vazio');
  if (!Number.isFinite(o.lat) || o.lat < -90 || o.lat > 90) errors.push('lat inválida');
  if (!Number.isFinite(o.lon) || o.lon < -180 || o.lon > 360) errors.push('lon inválida');
  if (!Number.isFinite(o.elevationM)) errors.push('elevation_m inválida');
  if (!(o.type in OBSTACLE_TYPES)) errors.push(`obstacle_type desconhecido (${o.type})`);
  if (!Number.isFinite(o.radiusM) || o.radiusM <= 0 || o.radiusM > 5000) errors.push('radius_meters deve estar entre 0 e 5000');
  if (!Number.isFinite(o.slopeDeg) || o.slopeDeg < 0 || o.slopeDeg > 90) errors.push('slope_deg deve estar entre 0 e 90');
  if (!Number.isFinite(o.severity) || o.severity < 0 || o.severity > 1) errors.push('severity_score deve estar entre 0 e 1');
  if (!Number.isInteger(o.criticality) || o.criticality < 1 || o.criticality > 5) errors.push('criticality_level deve ser inteiro de 1 a 5');
  return errors;
}

function withLocalCoordinates(obstacle) {
  const { x, y } = lonLatToKm(obstacle.lon, obstacle.lat);
  return { ...obstacle, x, y, r: obstacle.radiusM / 1000 };
}

/** Objeto do app → linha do CSV com as colunas e convenções originais. */
export function serializeObstacle(o) {
  return {
    obstacle_id: o.id,
    name: o.name,
    source_dataset: o.sourceDataset,
    lat: String(round(o.lat, 6)),
    lon: String(round(o.lon, 6)),
    elevation_m: String(round(o.elevationM, 2)),
    obstacle_type: o.type,
    radius_meters: String(round(o.radiusM, 1)),
    slope_deg: String(round(o.slopeDeg, 2)),
    severity_score: String(round(o.severity, 2)),
    criticality_level: String(o.criticality),
    passable_by_rover: o.passable ? 'True' : 'False',
    is_dynamic_report: o.isDynamic ? 'True' : 'False',
    description: o.description,
  };
}

const round = (v, digits) => Math.round(v * 10 ** digits) / 10 ** digits;

/** Nome para exibição: "Sol 286 Inclinacao (8.78 deg)" → "Inclinação de 8.78 deg (Sol 286)". */
export function displayName(o) {
  const m = /^Sol (\d+) Inclinacao \(([\d.]+) deg\)$/.exec(o.name);
  return m ? `Inclinação de ${m[2]} deg (Sol ${m[1]})` : o.name;
}

export function isUserObstacle(o) {
  return o.id.startsWith(USER_ID_PREFIX);
}

/**
 * Cria um empecilho reportado pelo usuário, preenchendo os campos derivados.
 * @param input {name, type, lat, lon, radiusM, criticality, passable, severity?, description}
 * @param terrain {elevationM, slopeDeg} lidos do DEM no local
 */
export function nextUserObstacleId(existing) {
  const next =
    existing
      .filter(isUserObstacle)
      .reduce((max, o) => Math.max(max, Number(o.id.slice(USER_ID_PREFIX.length)) || 0), 0) + 1;
  return `${USER_ID_PREFIX}${String(next).padStart(3, '0')}`;
}

export function createUserObstacle(input, terrain, existing) {
  const criticality = Number(input.criticality);
  const obstacle = {
    id: nextUserObstacleId(existing),
    name: String(input.name ?? '').trim(),
    sourceDataset: USER_SOURCE_DATASET,
    lat: input.lat,
    lon: input.lon,
    elevationM: terrain.elevationM,
    type: input.type,
    radiusM: Number(input.radiusM),
    slopeDeg: Number.isFinite(Number(input.slopeDeg)) ? Number(input.slopeDeg) : terrain.slopeDeg,
    severity: Number.isFinite(Number(input.severity)) && input.severity !== '' ? Number(input.severity) : DEFAULT_SEVERITY[criticality],
    criticality,
    passable: Boolean(input.passable),
    isDynamic: true,
    description: String(input.description ?? '').trim(),
  };
  const errors = validateObstacle(obstacle);
  if (errors.length) return { errors };
  return { obstacle: withLocalCoordinates(obstacle) };
}
