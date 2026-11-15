// Carrega os datasets do diretório data/ e converte para os modelos do app.
// A função de leitura é injetada para funcionar no navegador (fetch) e no Node (fs).

import { parseCsv } from '../model/csv.js';
import { parseObstacle } from '../model/obstacles.js';
import { parseSample } from '../model/samples.js';
import { lonLatToKm } from '../core/geo.js';

export const DATA_FILES = Object.freeze({
  obstacles: 'data/jezero_obstacles_v2_clean.csv',
  samples: 'data/M2020_amostras_armazenadas.csv',
  demMeta: 'data/dem_jezero_200m.json',
  demValues: 'data/dem_jezero_200m.bin',
  satelliteMeta: 'data/satellite_jezero.json',
  satelliteImage: 'data/satellite_jezero.jpg',
});

/** Marcos de referência que não são amostras nem empecilhos. */
export const LANDMARKS = Object.freeze([
  {
    id: 'oeb',
    name: 'Octavia E. Butler Landing',
    description: 'Local de pouso do Perseverance (18 fev 2021).',
    lon: 77.4508,
    lat: 18.4447,
  },
]);

function parseAll(records, parse) {
  const items = [];
  const errors = [];
  for (const record of records) {
    try {
      items.push(parse(record));
    } catch (error) {
      errors.push(error.message);
    }
  }
  return { items, errors };
}

/**
 * @param readText (path) => Promise<string>
 * @param readBinary (path) => Promise<ArrayBuffer>
 */
export async function loadDatasets({ readText, readBinary }) {
  const [obstaclesCsv, samplesCsv, demMetaJson, demBuffer] = await Promise.all([
    readText(DATA_FILES.obstacles),
    readText(DATA_FILES.samples),
    readText(DATA_FILES.demMeta),
    readBinary(DATA_FILES.demValues),
  ]);
  const obstacles = parseAll(parseCsv(obstaclesCsv).records, parseObstacle);
  const samples = parseAll(parseCsv(samplesCsv).records, parseSample);
  const demMeta = JSON.parse(demMetaJson);
  const dem = { ...demMeta, values: new Int16Array(demBuffer) };
  if (dem.values.length !== dem.width * dem.height) throw new Error('DEM com tamanho inesperado.');

  return {
    obstacles: obstacles.items,
    samples: samples.items,
    dem,
    landmarks: [...LANDMARKS.map(withKm), lastKnownRoverPosition(obstacles.items)].filter(Boolean),
    errors: [...obstacles.errors, ...samples.errors],
  };
}

const withKm = (l) => ({ ...l, ...lonLatToKm(l.lon, l.lat) });

/** O waypoint MMGIS de maior sol no dataset = última posição registrada do rover. */
function lastKnownRoverPosition(obstacles) {
  let latest = null;
  for (const o of obstacles) {
    const sol = Number(/^NASA_M20_SOL(\d+)_/.exec(o.id)?.[1]);
    if (Number.isFinite(sol) && (!latest || sol > latest.sol)) latest = { sol, o };
  }
  if (!latest) return null;
  return withKm({
    id: 'last-position',
    name: `Última posição registrada (Sol ${latest.sol})`,
    description: `Waypoint MMGIS mais recente do dataset de empecilhos (${latest.o.id}).`,
    lon: latest.o.lon,
    lat: latest.o.lat,
  });
}
