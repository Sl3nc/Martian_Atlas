// Modelo de pontos científicos, espelhando as colunas de
// data/M2020_amostras_armazenadas.csv (amostras armazenadas pelo Perseverance).

import { lonLatToKm, toEastingNorthing } from '../core/geo.js';

export const SAMPLE_COLUMNS = Object.freeze([
  'sample_id',
  'type',
  'sol',
  'target_name',
  'longitude',
  'latitude',
  'elevation',
  'easting',
  'northing',
]);

export const SAMPLE_TYPES = Object.freeze({
  core: 'Testemunho de rocha',
  regolith: 'Regolito',
  WTA: 'Tubo testemunha (WTA)',
});

const SAMPLE_ID = /^M2020-(\d{5})-(\d{2,})$/;

export function parseSample(row) {
  const sample = {
    id: String(row.sample_id ?? '').trim(),
    type: String(row.type ?? '').trim(),
    sol: Number(row.sol),
    targetName: String(row.target_name ?? '').trim(),
    lon: Number(row.longitude),
    lat: Number(row.latitude),
    elevationM: Number(row.elevation),
    easting: Number(row.easting),
    northing: Number(row.northing),
  };
  const errors = validateSample(sample);
  if (errors.length) throw new Error(`Amostra "${sample.id || '?'}" inválida: ${errors.join('; ')}`);
  return withLocalCoordinates(sample);
}

export function validateSample(s) {
  const errors = [];
  if (!SAMPLE_ID.test(s.id)) errors.push('sample_id deve seguir M2020-SSSSS-NN');
  if (!(s.type in SAMPLE_TYPES)) errors.push(`type desconhecido (${s.type})`);
  if (!Number.isInteger(s.sol) || s.sol < 0) errors.push('sol deve ser inteiro ≥ 0');
  if (!s.targetName) errors.push('target_name vazio');
  if (!Number.isFinite(s.lat) || !Number.isFinite(s.lon)) errors.push('coordenadas inválidas');
  if (!Number.isFinite(s.elevationM)) errors.push('elevation inválida');
  if (!Number.isFinite(s.easting) || !Number.isFinite(s.northing)) errors.push('easting/northing inválidos');
  return errors;
}

function withLocalCoordinates(sample) {
  return { ...sample, ...lonLatToKm(sample.lon, sample.lat) };
}

export function serializeSample(s) {
  return {
    sample_id: s.id,
    type: s.type,
    sol: String(s.sol),
    target_name: s.targetName,
    longitude: String(round(s.lon, 8)),
    latitude: String(round(s.lat, 8)),
    elevation: String(round(s.elevationM, 3)),
    easting: String(round(s.easting, 3)),
    northing: String(round(s.northing, 3)),
  };
}

const round = (v, digits) => Math.round(v * 10 ** digits) / 10 ** digits;

/** Sequência = último número do sample_id (ex.: M2020-00639-21 → 21). */
const sequenceOf = (id) => Number(SAMPLE_ID.exec(id)?.[2] ?? 0);

export function isUserSample(sample, baseIds) {
  return !baseIds.has(sample.id);
}

/**
 * Registra um novo ponto científico no padrão do dataset.
 * sample_id = M2020-<sol com 5 dígitos>-<próxima sequência>.
 */
export function createSample(input, terrain, existing) {
  const sol = Number(input.sol);
  const sequence = existing.reduce((max, s) => Math.max(max, sequenceOf(s.id)), 0) + 1;
  const { easting, northing } = toEastingNorthing(input.lon, input.lat);
  const sample = {
    id: `M2020-${String(Number.isInteger(sol) ? sol : 0).padStart(5, '0')}-${String(sequence).padStart(2, '0')}`,
    type: input.type,
    sol,
    targetName: String(input.targetName ?? '').trim(),
    lon: input.lon,
    lat: input.lat,
    elevationM: terrain.elevationM,
    easting,
    northing,
  };
  const errors = validateSample(sample);
  if (errors.length) return { errors };
  return { sample: withLocalCoordinates(sample) };
}
