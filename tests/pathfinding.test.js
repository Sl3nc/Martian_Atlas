import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPath, smoothPath, nearestTraversable, lineCost } from '../js/core/pathfinding.js';

function makeGrid(rows) {
  const height = rows.length;
  const width = rows[0].length;
  const cost = new Float32Array(width * height);
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      cost[y * width + x] = ch === '#' ? Infinity : ch === 's' ? 4 : 1;
    }),
  );
  return { width, height, cost };
}
const at = (grid, x, y) => y * grid.width + x;

test('contorna uma parede passando pela única abertura', () => {
  const grid = makeGrid(['.....#....', '.....#....', '.....#....', '..........', '.....#....']);
  const path = findPath(grid, at(grid, 0, 0), at(grid, 9, 0));
  assert.ok(path);
  assert.ok(path.every((i) => Number.isFinite(grid.cost[i])), 'nenhuma célula bloqueada no caminho');
  assert.ok(path.includes(at(grid, 5, 3)), 'passa pela abertura');
});

test('retorna null quando não existe caminho', () => {
  const grid = makeGrid(['..#..', '..#..', '..#..']);
  assert.equal(findPath(grid, at(grid, 0, 0), at(grid, 4, 0)), null);
});

test('não corta quinas na diagonal entre dois bloqueios', () => {
  const grid = makeGrid(['.#', '#.']);
  assert.equal(findPath(grid, at(grid, 0, 0), at(grid, 1, 1)), null);
});

test('prefere dar a volta a atravessar terreno caro (areia)', () => {
  const grid = makeGrid(['.....', '.sss.', '.sss.', '.sss.', '.....']);
  const path = findPath(grid, at(grid, 0, 2), at(grid, 4, 2));
  assert.ok(path.every((i) => grid.cost[i] === 1), 'evita a areia');
});

test('suavização reduz um caminho reto em grade aberta a 2 pontos', () => {
  const grid = makeGrid(['..........', '..........', '..........']);
  const path = findPath(grid, at(grid, 0, 0), at(grid, 9, 2));
  const smooth = smoothPath(grid, path);
  assert.equal(smooth.length, 2);
});

test('suavização nunca cria segmento que cruze bloqueio', () => {
  const grid = makeGrid(['..........', '....##....', '....##....', '..........']);
  const smooth = smoothPath(grid, findPath(grid, at(grid, 0, 1), at(grid, 9, 2)));
  for (let i = 1; i < smooth.length; i++) {
    const a = smooth[i - 1];
    const b = smooth[i];
    assert.ok(Number.isFinite(lineCost(grid, a.x, a.y, b.x, b.y)));
  }
});

test('nearestTraversable encontra a célula livre mais próxima', () => {
  const grid = makeGrid(['...', '.#.', '...']);
  const free = nearestTraversable(grid, at(grid, 1, 1));
  assert.notEqual(free, at(grid, 1, 1));
  assert.ok(Number.isFinite(grid.cost[free]));
});
