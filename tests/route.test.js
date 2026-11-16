import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadWorld } from './helpers.js';
import { addObstacle, removeObstacle, isTraversableAt } from '../js/core/world.js';
import { planRoute, planAlternatives, firstBlockedAlong } from '../js/core/route.js';
import { TraverseSimulation } from '../js/core/traverse.js';
import { createUserObstacle } from '../js/model/obstacles.js';
import { kmToLonLat } from '../js/core/geo.js';

const { world, data } = await loadWorld();
const stop = (p) => ({ x: p.x, y: p.y, name: p.name ?? p.targetName });

test('datasets carregam sem erros e o DEM tem valores plausíveis para Jezero', () => {
  assert.equal(data.errors.length, 0);
  assert.equal(data.samples.length, 21);
  assert.equal(data.obstacles.length, 325);
  const floor = world.elevation[Math.floor(world.height / 2) * world.width + Math.floor(world.width / 2)];
  assert.ok(floor < -2000 && floor > -3000, `elevação ${floor}`);
});

test('todas as amostras são alcançáveis a partir do local de pouso', () => {
  const landing = data.landmarks.find((l) => l.id === 'oeb');
  for (const sample of data.samples) {
    assert.ok(planRoute(world, [stop(landing), stop(sample)]).ok, sample.id);
  }
});

test('a rota nunca entra em empecilhos intransponíveis', () => {
  const route = planRoute(world, [stop(data.landmarks[0]), stop(data.landmarks[1])]);
  assert.ok(route.ok);
  for (const s of route.analysis.samples) {
    for (const o of world.obstacles.filter((ob) => !ob.passable)) {
      assert.ok(Math.hypot(s.x - o.x, s.y - o.y) > o.r, `entra em ${o.name}`);
    }
  }
});

test('rotas alternativas são distintas e rotuladas', () => {
  const routes = planAlternatives(world, [stop(data.landmarks[0]), stop(data.landmarks[1])]);
  assert.ok(routes.length >= 2, `só ${routes.length} rota(s)`);
  assert.ok(routes.some((r) => r.tags.includes('Mais rápida')));
  const ids = new Set(routes.map((r) => r.id));
  assert.equal(ids.size, routes.length);
});

test('novo empecilho intransponível bloqueia a rota em andamento e o recálculo desvia', () => {
  const stops = [stop(data.landmarks[0]), stop(data.samples[0])];
  const before = planRoute(world, stops);
  const mid = before.analysis.samples[Math.floor(before.analysis.samples.length / 2)];
  const { lon, lat } = kmToLonLat(mid.x, mid.y);
  const { obstacle } = createUserObstacle(
    { name: 'Teste', type: 'boulder_field', lat, lon, radiusM: 150, criticality: 5, passable: false },
    { elevationM: -2500, slopeDeg: 3 },
    world.obstacles,
  );
  addObstacle(world, obstacle);
  try {
    assert.equal(isTraversableAt(world, mid.x, mid.y), false);
    assert.ok(firstBlockedAlong(world, before.analysis.samples, 0));
    const after = planRoute(world, stops);
    assert.ok(after.ok);
    assert.equal(firstBlockedAlong(world, after.analysis.samples, 0), null);
  } finally {
    removeObstacle(world, obstacle.id);
  }
});

test('simulação do trajeto: distância e tempo restantes caem até zero', () => {
  const route = planRoute(world, [stop(data.landmarks[0]), stop(data.samples[10])]);
  const sim = new TraverseSimulation(route.analysis);
  const half = sim.advance(route.analysis.driveHours / 2);
  assert.ok(half.remainingKm > 0 && half.remainingKm < route.analysis.distanceKm);
  assert.ok(Math.abs(half.remainingHours - route.analysis.driveHours / 2) < 1e-6);
  const end = sim.advance(1e6);
  assert.equal(end.done, true);
  assert.ok(end.remainingKm < 1e-9);
});
