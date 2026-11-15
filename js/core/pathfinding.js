// A* em grade 8-conectada + suavização por "linha de visada".
// Módulo puro (sem DOM): recebe { width, height, cost } onde cost[i] é o custo
// por unidade de distância da célula i, ou Infinity se ela for intransponível.

const SQRT2 = Math.SQRT2;
const NEIGHBORS = [
  [1, 0, 1],
  [-1, 0, 1],
  [0, 1, 1],
  [0, -1, 1],
  [1, 1, SQRT2],
  [1, -1, SQRT2],
  [-1, 1, SQRT2],
  [-1, -1, SQRT2],
];

class MinHeap {
  constructor() {
    this.nodes = [];
    this.keys = [];
  }

  get size() {
    return this.nodes.length;
  }

  push(node, key) {
    const { nodes, keys } = this;
    let i = nodes.length;
    nodes.push(node);
    keys.push(key);
    while (i > 0) {
      const parent = (i - 1) >> 1;
      if (keys[parent] <= key) break;
      nodes[i] = nodes[parent];
      keys[i] = keys[parent];
      i = parent;
    }
    nodes[i] = node;
    keys[i] = key;
  }

  pop() {
    const { nodes, keys } = this;
    const top = nodes[0];
    const lastNode = nodes.pop();
    const lastKey = keys.pop();
    const len = nodes.length;
    if (len > 0) {
      let i = 0;
      for (;;) {
        let child = 2 * i + 1;
        if (child >= len) break;
        if (child + 1 < len && keys[child + 1] < keys[child]) child++;
        if (keys[child] >= lastKey) break;
        nodes[i] = nodes[child];
        keys[i] = keys[child];
        i = child;
      }
      nodes[i] = lastNode;
      keys[i] = lastKey;
    }
    return top;
  }
}

const passable = (cost, i) => Number.isFinite(cost[i]);

/**
 * Menor caminho (em custo) entre duas células.
 * @returns {number[] | null} índices das células, do início ao fim; null se não houver caminho.
 */
export function findPath(grid, start, goal) {
  const { width, height, cost } = grid;
  if (!passable(cost, start) || !passable(cost, goal)) return null;
  if (start === goal) return [start];

  const n = width * height;
  const g = new Float64Array(n).fill(Infinity);
  const cameFrom = new Int32Array(n).fill(-1);
  const closed = new Uint8Array(n);
  const open = new MinHeap();
  const gx = goal % width;
  const gy = (goal / width) | 0;

  // Heurística octil: admissível porque o custo mínimo de qualquer célula é 1.
  const heuristic = (i) => {
    const dx = Math.abs((i % width) - gx);
    const dy = Math.abs(((i / width) | 0) - gy);
    return dx + dy + (SQRT2 - 2) * Math.min(dx, dy);
  };

  g[start] = 0;
  open.push(start, heuristic(start));

  while (open.size > 0) {
    const current = open.pop();
    if (current === goal) return reconstruct(cameFrom, current);
    if (closed[current]) continue;
    closed[current] = 1;

    const cx = current % width;
    const cy = (current / width) | 0;
    for (const [dx, dy, length] of NEIGHBORS) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
      const next = ny * width + nx;
      if (closed[next] || !passable(cost, next)) continue;
      // Não "cortar quinas" entre duas células bloqueadas na diagonal.
      if (dx && dy && (!passable(cost, cy * width + nx) || !passable(cost, ny * width + cx))) continue;

      const tentative = g[current] + (length * (cost[current] + cost[next])) / 2;
      if (tentative < g[next]) {
        g[next] = tentative;
        cameFrom[next] = current;
        open.push(next, tentative + heuristic(next));
      }
    }
  }
  return null;
}

function reconstruct(cameFrom, node) {
  const path = [node];
  while (cameFrom[node] !== -1) {
    node = cameFrom[node];
    path.push(node);
  }
  return path.reverse();
}

/** Célula transponível mais próxima (busca em anéis), ou −1. */
export function nearestTraversable(grid, index, maxRadius = 30) {
  const { width, height, cost } = grid;
  if (passable(cost, index)) return index;
  const cx = index % width;
  const cy = (index / width) | 0;
  for (let r = 1; r <= maxRadius; r++) {
    let best = -1;
    let bestDist = Infinity;
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
        const x = cx + dx;
        const y = cy + dy;
        if (x < 0 || y < 0 || x >= width || y >= height) continue;
        const i = y * width + x;
        const d = dx * dx + dy * dy;
        if (passable(cost, i) && d < bestDist) {
          best = i;
          bestDist = d;
        }
      }
    }
    if (best >= 0) return best;
  }
  return -1;
}

/**
 * Custo de seguir em linha reta entre dois pontos (em unidades de célula).
 * Retorna Infinity se a linha cruzar alguma célula intransponível.
 */
export function lineCost(grid, ax, ay, bx, by) {
  const { width, cost } = grid;
  const length = Math.hypot(bx - ax, by - ay);
  const steps = Math.max(1, Math.ceil(length / 0.25));
  const step = length / steps;
  let sum = 0;
  for (let s = 0; s < steps; s++) {
    const t = (s + 0.5) / steps;
    const c = cost[Math.floor(ay + (by - ay) * t) * width + Math.floor(ax + (bx - ax) * t)];
    if (!Number.isFinite(c)) return Infinity;
    sum += c * step;
  }
  return sum;
}

const SMOOTHING_TOLERANCE = 1.02;
const SMOOTHING_LOOKAHEAD = 8;

/**
 * Remove o "zigue-zague" típico de grade: troca trechos do caminho por retas
 * quando a reta é segura E não fica mais cara (ex.: não atravessa areia para encurtar).
 * @returns {{x: number, y: number}[]} pontos em unidades de célula (centros em i + 0.5).
 */
export function smoothPath(grid, cells) {
  const { width, cost } = grid;
  const points = cells.map((i) => ({ x: (i % width) + 0.5, y: ((i / width) | 0) + 0.5 }));
  if (points.length <= 2) return points;

  const cumulative = new Float64Array(points.length);
  for (let k = 1; k < points.length; k++) {
    const step = Math.hypot(points[k].x - points[k - 1].x, points[k].y - points[k - 1].y);
    cumulative[k] = cumulative[k - 1] + (step * (cost[cells[k]] + cost[cells[k - 1]])) / 2;
  }

  const result = [points[0]];
  let i = 0;
  while (i < points.length - 1) {
    let best = i + 1;
    let misses = 0;
    for (let k = i + 2; k < points.length; k++) {
      const straight = lineCost(grid, points[i].x, points[i].y, points[k].x, points[k].y);
      if (straight <= (cumulative[k] - cumulative[i]) * SMOOTHING_TOLERANCE + 1e-9) {
        best = k;
        misses = 0;
      } else if (++misses > SMOOTHING_LOOKAHEAD) {
        break;
      }
    }
    result.push(points[best]);
    i = best;
  }
  return result;
}
