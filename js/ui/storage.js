// Persistência local (por navegador). Empecilhos e pontos científicos são
// guardados JÁ no formato de linha dos CSVs originais (modelo estabelecido),
// e revalidados pelos parsers do modelo ao carregar.

import { parseObstacle, serializeObstacle } from '../model/obstacles.js';
import { parseSample, serializeSample } from '../model/samples.js';

const KEYS = {
  obstacles: 'martian-atlas:v2:obstacles',
  samples: 'martian-atlas:v2:samples',
  routes: 'martian-atlas:v2:routes',
};
const MAX_ROUTES = 50;

function read(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function parseValid(rows, parse) {
  const items = [];
  for (const row of rows) {
    try {
      items.push(parse(row));
    } catch {
      // Linha corrompida ou de versão antiga: ignorada (não derruba o app).
    }
  }
  return items;
}

export const loadUserObstacles = () => parseValid(read(KEYS.obstacles), parseObstacle);
export const saveUserObstacles = (items) => write(KEYS.obstacles, items.map(serializeObstacle));

export const loadUserSamples = () => parseValid(read(KEYS.samples), parseSample);
export const saveUserSamples = (items) => write(KEYS.samples, items.map(serializeSample));

const validPoint = (p) => p && Number.isFinite(p.x) && Number.isFinite(p.y);
export const loadRoutes = () =>
  read(KEYS.routes).filter(
    (r) => r && typeof r.id === 'string' && Array.isArray(r.stops) && r.stops.every(validPoint) && Array.isArray(r.path),
  );
export const saveRoutes = (routes) => write(KEYS.routes, routes.slice(-MAX_ROUTES));
