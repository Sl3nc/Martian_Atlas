export const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

export const lerp = (a, b, t) => a + (b - a) * t;

/** Interpolação suave; funciona também com edge0 > edge1 (curva decrescente). */
export function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Ponto mais próximo de (px, py) no segmento AB, com o parâmetro t ∈ [0, 1]. */
export function closestPointOnSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy;
  const t = len2 > 0 ? clamp(((px - ax) * dx + (py - ay) * dy) / len2, 0, 1) : 0;
  const x = ax + dx * t;
  const y = ay + dy * t;
  return { x, y, t, dist: Math.hypot(px - x, py - y) };
}

export function distanceToPolyline(px, py, points) {
  let best = Infinity;
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1];
    const b = points[i];
    best = Math.min(best, closestPointOnSegment(px, py, a.x, a.y, b.x, b.y).dist);
  }
  return best;
}

/** Diferença angular assinada (b − a) em graus, no intervalo (−180, 180]. */
export function angleDelta(a, b) {
  const d = (((b - a) % 360) + 540) % 360 - 180;
  return d === -180 ? 180 : d;
}
