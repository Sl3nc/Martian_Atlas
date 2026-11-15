// Mapa interativo em <canvas>: arrastar, zoom (roda, pinça, teclado, duplo clique),
// camadas base (satélite / relevo), sobreposições, rotas, trajeto e marcadores.
// Comunica-se com o app apenas por callbacks (handlers).

import { clamp, closestPointOnSegment } from '../lib/math.js';
import { MAP_WIDTH_KM, MAP_HEIGHT_KM } from '../core/geo.js';
import { BLOCK_MARGIN_KM } from '../core/world.js';
import { CRITICALITY, displayName } from '../model/obstacles.js';

const MIN_SCALE = 8; // px por km
const MAX_SCALE = 4000;
const CLICK_TOLERANCE_PX = 5;
const LONG_PRESS_MS = 550;
const PIN_HEAD_OFFSET = 24;
const LETTERS = 'ABCDEFGHIJ';

export const SAMPLE_COLORS = Object.freeze({ core: '#4fd1c5', regolith: '#b794f4', WTA: '#f6ad55' });

const COLORS = {
  background: '#0f0b0a',
  routeCasing: '#0b2a66',
  route: '#4c9dff',
  altCasing: '#2c3446',
  alt: '#9fb2d6',
  traveled: '#c9d2e3',
  pin: '#ea4335',
  pinStroke: '#7a1a12',
  labelHalo: 'rgba(12, 8, 7, 0.85)',
};

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export class MapView {
  #pointers = new Map();
  #drag = null;
  #pinch = null;
  #longPressTimer = 0;
  #frame = 0;
  #animation = 0;

  constructor(canvas, world, images, handlers = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.world = world;
    this.images = images; // { satellite, relief, slope }
    this.handlers = handlers;
    this.view = { cx: MAP_WIDTH_KM / 2, cy: MAP_HEIGHT_KM / 2, scale: 20 };
    this.base = images.satellite ? 'satellite' : 'relief';
    this.layers = { obstacles: true, samples: true, slope: false };
    this.getInsets = () => ({ left: 0, right: 0, top: 0, bottom: 0 });
    this.state = {
      markers: [], // { id, kind: 'sample' | 'landmark', x, y, name, color, user }
      stops: [],
      routes: [],
      selectedRouteId: null,
      traverse: null, // { position, distanceKm }
      historyPath: null,
      selectedMarkerId: null,
      selectedObstacleId: null,
      droppedPin: null,
      probe: null,
      pickMode: false,
    };
    this.width = 0;
    this.height = 0;
    this.#bindEvents();
    this.resize();
    new ResizeObserver(() => this.resize()).observe(canvas);
  }

  set(partial) {
    Object.assign(this.state, partial);
    this.canvas.classList.toggle('picking', this.state.pickMode);
    this.requestDraw();
  }

  setBase(base) {
    this.base = base;
    this.requestDraw();
  }

  setLayer(name, visible) {
    this.layers[name] = visible;
    this.requestDraw();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.round(rect.width * this.dpr);
    this.canvas.height = Math.round(rect.height * this.dpr);
    this.draw();
  }

  requestDraw() {
    if (this.#frame) return;
    this.#frame = requestAnimationFrame(() => {
      this.#frame = 0;
      this.draw();
    });
  }

  // ---------- Transformações ----------

  worldToScreen(x, y) {
    return {
      x: (x - this.view.cx) * this.view.scale + this.width / 2,
      y: (y - this.view.cy) * this.view.scale + this.height / 2,
    };
  }

  screenToWorld(sx, sy) {
    return {
      x: (sx - this.width / 2) / this.view.scale + this.view.cx,
      y: (sy - this.height / 2) / this.view.scale + this.view.cy,
    };
  }

  zoomAt(sx, sy, factor) {
    const before = this.screenToWorld(sx, sy);
    this.view.scale = clamp(this.view.scale * factor, MIN_SCALE, MAX_SCALE);
    const after = this.screenToWorld(sx, sy);
    this.view.cx += before.x - after.x;
    this.view.cy += before.y - after.y;
    this.#viewChanged();
  }

  zoomBy(factor) {
    const ins = this.getInsets();
    this.zoomAt((ins.left + this.width - ins.right) / 2, (ins.top + this.height - ins.bottom) / 2, factor);
  }

  panBy(dx, dy) {
    this.view.cx -= dx / this.view.scale;
    this.view.cy -= dy / this.view.scale;
    this.#viewChanged();
  }

  #viewChanged() {
    this.view.cx = clamp(this.view.cx, -5, MAP_WIDTH_KM + 5);
    this.view.cy = clamp(this.view.cy, -5, MAP_HEIGHT_KM + 5);
    this.requestDraw();
  }

  #centerFor(x, y, scale) {
    const ins = this.getInsets();
    return { cx: x - (ins.left - ins.right) / 2 / scale, cy: y - (ins.top - ins.bottom) / 2 / scale };
  }

  /** Centraliza sem animar (usado para seguir o rover a cada quadro). */
  centerOn(x, y) {
    Object.assign(this.view, this.#centerFor(x, y, this.view.scale));
    this.#viewChanged();
  }

  flyTo({ x, y, scale = this.view.scale }, { animate = true } = {}) {
    const targetScale = clamp(scale, MIN_SCALE, MAX_SCALE);
    const end = { ...this.#centerFor(x, y, targetScale), scale: targetScale };
    cancelAnimationFrame(this.#animation);
    if (!animate || reducedMotion()) {
      Object.assign(this.view, end);
      this.#viewChanged();
      return;
    }
    const start = { ...this.view };
    const t0 = performance.now();
    const duration = 450;
    const step = (now) => {
      const t = clamp((now - t0) / duration, 0, 1);
      const k = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
      this.view.scale = Math.exp(Math.log(start.scale) + (Math.log(end.scale) - Math.log(start.scale)) * k);
      this.view.cx = start.cx + (end.cx - start.cx) * k;
      this.view.cy = start.cy + (end.cy - start.cy) * k;
      this.#viewChanged();
      if (t < 1) this.#animation = requestAnimationFrame(step);
    };
    this.#animation = requestAnimationFrame(step);
  }

  fitBounds({ minX, minY, maxX, maxY }, { padding = 56, animate = true } = {}) {
    const ins = this.getInsets();
    const availableW = Math.max(80, this.width - ins.left - ins.right - 2 * padding);
    const availableH = Math.max(80, this.height - ins.top - ins.bottom - 2 * padding);
    const scale = Math.min(availableW / Math.max(maxX - minX, 0.1), availableH / Math.max(maxY - minY, 0.1));
    this.flyTo({ x: (minX + maxX) / 2, y: (minY + maxY) / 2, scale }, { animate });
  }

  fitAll(options) {
    this.fitBounds({ minX: 0, minY: 0, maxX: MAP_WIDTH_KM, maxY: MAP_HEIGHT_KM }, { padding: 16, ...options });
  }

  // ---------- Eventos ----------

  #bindEvents() {
    const c = this.canvas;
    c.addEventListener('pointerdown', (e) => this.#onPointerDown(e));
    c.addEventListener('pointermove', (e) => this.#onPointerMove(e));
    c.addEventListener('pointerup', (e) => this.#onPointerUp(e, false));
    c.addEventListener('pointercancel', (e) => this.#onPointerUp(e, true));
    c.addEventListener('pointerleave', () => this.handlers.onHover?.(null));
    c.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const p = this.#local(e);
        this.zoomAt(p.x, p.y, Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0015)));
      },
      { passive: false },
    );
    c.addEventListener('dblclick', (e) => {
      const p = this.#local(e);
      this.zoomAt(p.x, p.y, 2);
    });
    c.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.#emitContextMenu(this.#local(e));
    });
    c.addEventListener('keydown', (e) => this.#onKeyDown(e));
  }

  #local(e) {
    const rect = this.canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  #emitContextMenu(p) {
    this.handlers.onContextMenu?.({ ...this.screenToWorld(p.x, p.y), sx: p.x, sy: p.y });
  }

  #clearLongPress() {
    clearTimeout(this.#longPressTimer);
    this.#longPressTimer = 0;
  }

  #onPointerDown(e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    this.canvas.setPointerCapture(e.pointerId);
    this.handlers.onHover?.(null); // esconde a prévia enquanto arrasta o mapa
    const p = this.#local(e);
    this.#pointers.set(e.pointerId, p);
    this.handlers.onInteractionStart?.();
    if (this.#pointers.size === 1) {
      this.#drag = { start: p, last: p, moved: false, consumed: false };
      if (e.pointerType !== 'mouse') {
        this.#longPressTimer = setTimeout(() => {
          if (this.#drag && !this.#drag.moved) {
            this.#drag.consumed = true;
            this.#emitContextMenu(p);
          }
        }, LONG_PRESS_MS);
      }
    } else if (this.#pointers.size === 2) {
      this.#clearLongPress();
      const [a, b] = [...this.#pointers.values()];
      this.#pinch = { distance: Math.hypot(a.x - b.x, a.y - b.y), mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } };
      if (this.#drag) this.#drag.moved = true;
    }
  }

  #onPointerMove(e) {
    const p = this.#local(e);
    if (!this.#pointers.has(e.pointerId)) {
      const hit = this.hitTest(p.x, p.y);
      this.handlers.onHover?.(this.screenToWorld(p.x, p.y), hit, p);
      this.canvas.classList.toggle('over-marker', Boolean(hit));
      return;
    }
    this.#pointers.set(e.pointerId, p);
    if (this.#pinch && this.#pointers.size >= 2) {
      const [a, b] = [...this.#pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      this.panBy(mid.x - this.#pinch.mid.x, mid.y - this.#pinch.mid.y);
      this.zoomAt(mid.x, mid.y, distance / this.#pinch.distance);
      this.#pinch = { distance, mid };
      return;
    }
    const drag = this.#drag;
    if (!drag) return;
    if (!drag.moved && Math.hypot(p.x - drag.start.x, p.y - drag.start.y) > CLICK_TOLERANCE_PX) {
      drag.moved = true;
      this.#clearLongPress();
      this.canvas.classList.add('dragging');
      this.handlers.onUserPan?.();
    }
    if (drag.moved) this.panBy(p.x - drag.last.x, p.y - drag.last.y);
    drag.last = p;
  }

  #onPointerUp(e, cancelled) {
    if (!this.#pointers.has(e.pointerId)) return;
    const drag = this.#drag;
    this.#pointers.delete(e.pointerId);
    this.#clearLongPress();
    if (this.#pointers.size < 2) this.#pinch = null;
    if (this.#pointers.size === 0) {
      this.#drag = null;
      this.canvas.classList.remove('dragging');
      if (!cancelled && drag && !drag.moved && !drag.consumed) this.#handleClick(this.#local(e));
    } else if (this.#pointers.size === 1) {
      const remaining = [...this.#pointers.values()][0];
      this.#drag = { start: remaining, last: remaining, moved: true, consumed: true };
    }
  }

  #handleClick(p) {
    const hit = this.hitTest(p.x, p.y);
    if (hit) this.handlers.onHit?.(hit);
    else this.handlers.onMapClick?.({ ...this.screenToWorld(p.x, p.y), sx: p.x, sy: p.y });
  }

  #onKeyDown(e) {
    const PAN = 80;
    const actions = {
      ArrowLeft: () => this.panBy(PAN, 0),
      ArrowRight: () => this.panBy(-PAN, 0),
      ArrowUp: () => this.panBy(0, PAN),
      ArrowDown: () => this.panBy(0, -PAN),
      '+': () => this.zoomBy(1.5),
      '=': () => this.zoomBy(1.5),
      '-': () => this.zoomBy(1 / 1.5),
    };
    if (actions[e.key]) {
      e.preventDefault();
      actions[e.key]();
    }
  }

  // ---------- Hit test ----------

  #obstacleRadiusPx(o) {
    return Math.max(o.r * this.view.scale, 3 + o.criticality * 0.9);
  }

  #visibleObstacles() {
    if (!this.layers.obstacles) return [];
    return [...this.world.obstacles];
  }

  /** O que está sob o ponto de tela: marcador, empecilho ou rota alternativa. */
  hitTest(sx, sy) {
    const { markers, selectedMarkerId } = this.state;
    if (this.layers.samples || markers.some((m) => m.kind !== 'sample')) {
      for (let k = markers.length - 1; k >= 0; k--) {
        const m = markers[k];
        if (m.kind === 'sample' && !this.layers.samples) continue;
        const p = this.worldToScreen(m.x, m.y);
        const isPin = m.id === selectedMarkerId;
        const hit = isPin
          ? Math.hypot(sx - p.x, sy - (p.y - PIN_HEAD_OFFSET)) < 14 || Math.hypot(sx - p.x, sy - p.y) < 8
          : Math.hypot(sx - p.x, sy - p.y) < 10;
        if (hit) return { type: 'marker', marker: m };
      }
    }
    const obstacles = this.#visibleObstacles();
    let best = null;
    for (const o of obstacles) {
      const p = this.worldToScreen(o.x, o.y);
      const d = Math.hypot(sx - p.x, sy - p.y);
      if (d <= this.#obstacleRadiusPx(o) + 2 && (!best || o.criticality > best.criticality || d < best.d)) {
        best = { ...o, d };
      }
    }
    if (best) return { type: 'obstacle', obstacle: obstacles.find((o) => o.id === best.id) };

    for (const route of this.state.routes) {
      if (route.id === this.state.selectedRouteId) continue;
      if (this.#distanceToPath(sx, sy, route.analysis.path) < 8) return { type: 'route', route };
    }
    return null;
  }

  #distanceToPath(sx, sy, path) {
    let best = Infinity;
    for (let i = 1; i < path.length; i++) {
      const a = this.worldToScreen(path[i - 1].x, path[i - 1].y);
      const b = this.worldToScreen(path[i].x, path[i].y);
      best = Math.min(best, closestPointOnSegment(sx, sy, a.x, a.y, b.x, b.y).dist);
    }
    return best;
  }

  // ---------- Desenho ----------

  draw() {
    const { ctx } = this;
    if (!this.width || !this.height) return;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, this.width, this.height);
    this.bounds = { tl: this.screenToWorld(0, 0), br: this.screenToWorld(this.width, this.height) };

    const base = this.base === 'satellite' && this.images.satellite ? this.images.satellite : this.images.relief;
    this.#drawRaster(base);
    if (this.layers.slope) this.#drawRaster(this.images.slope);
    this.#drawObstacles();
    this.#drawRoutes();
    const history = this.state.historyPath;
    this.#drawPath(history?.path, { casing: '#3b2a5c', line: '#c49bff', width: 4, dash: [8, 6] });
    this.#drawPath(history?.traveledPath, { casing: '#3b2a5c', line: '#c49bff', width: 4.5 });
    this.#drawProbe();
    this.#drawMarkers();
    this.#drawRover();
    this.#drawScaleBar();
  }

  #visible(x, y, r) {
    const { tl, br } = this.bounds;
    return x + r >= tl.x && x - r <= br.x && y + r >= tl.y && y - r <= br.y;
  }

  /** Desenha apenas o recorte visível da imagem (evita drawImage gigante em zoom alto). */
  #drawRaster(image) {
    const { tl, br } = this.bounds;
    const x0 = Math.max(0, tl.x);
    const y0 = Math.max(0, tl.y);
    const x1 = Math.min(MAP_WIDTH_KM, br.x);
    const y1 = Math.min(MAP_HEIGHT_KM, br.y);
    if (x1 <= x0 || y1 <= y0) return;
    const kx = image.width / MAP_WIDTH_KM;
    const ky = image.height / MAP_HEIGHT_KM;
    const s = this.worldToScreen(x0, y0);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.drawImage(
      image,
      x0 * kx,
      y0 * ky,
      (x1 - x0) * kx,
      (y1 - y0) * ky,
      s.x,
      s.y,
      (x1 - x0) * this.view.scale,
      (y1 - y0) * this.view.scale,
    );
  }

  #drawObstacles() {
    const { ctx } = this;
    const routeIds = new Set(this.#selectedRoute()?.analysis.obstacles.map((i) => i.obstacle.id) ?? []);
    const list = this.#visibleObstacles().sort((a, b) => a.criticality - b.criticality);
    ctx.save();
    for (const o of list) {
      if (!this.#visible(o.x, o.y, o.r + 0.2)) continue;
      const p = this.worldToScreen(o.x, o.y);
      const rr = this.#obstacleRadiusPx(o);
      const color = CRITICALITY[o.criticality].color;

      if (!o.passable && o.r * this.view.scale > 6) {
        // Zona de exclusão (raio + folga de segurança).
        ctx.beginPath();
        ctx.arc(p.x, p.y, (o.r + BLOCK_MARGIN_KM[o.criticality]) * this.view.scale, 0, Math.PI * 2);
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, rr, 0, Math.PI * 2);
      ctx.fillStyle = `${color}${o.passable ? '55' : '88'}`;
      ctx.fill();
      ctx.lineWidth = o.passable ? 1.5 : 2.5;
      ctx.strokeStyle = routeIds.has(o.id) ? '#ffffff' : color;
      ctx.stroke();

      if (!o.passable) {
        const x = Math.min(rr * 0.55, 7);
        ctx.beginPath();
        ctx.moveTo(p.x - x, p.y - x);
        ctx.lineTo(p.x + x, p.y + x);
        ctx.moveTo(p.x + x, p.y - x);
        ctx.lineTo(p.x - x, p.y + x);
        ctx.strokeStyle = '#1b0f0b';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      if (o.isDynamic) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, rr + 4, 0, Math.PI * 2);
        ctx.setLineDash([2, 3]);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }
      if (o.id === this.state.selectedObstacleId) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, rr + 7, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      }
      if (o.criticality >= 4 && this.view.scale > 250) {
        this.#label(displayName(o), p.x + rr + 4, p.y + 4, { size: 11, color: '#ffe3d6' });
      }
    }
    ctx.restore();
  }

  #selectedRoute() {
    return this.state.routes.find((r) => r.id === this.state.selectedRouteId) ?? null;
  }

  #drawPath(path, { casing, line, width, dash = [] }) {
    if (!path || path.length < 2) return;
    const { ctx } = this;
    ctx.save();
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    path.forEach((pt, i) => {
      const p = this.worldToScreen(pt.x, pt.y);
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.strokeStyle = casing;
    ctx.lineWidth = width + 3.5;
    ctx.stroke();
    ctx.setLineDash(dash);
    ctx.strokeStyle = line;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  }

  #drawRoutes() {
    const selected = this.#selectedRoute();
    for (const route of this.state.routes) {
      if (route !== selected) {
        this.#drawPath(route.analysis.path, { casing: COLORS.altCasing, line: COLORS.alt, width: 4 });
      }
    }
    if (!selected) return;
    this.#drawPath(selected.analysis.path, { casing: COLORS.routeCasing, line: COLORS.route, width: 5.5 });
    const traverse = this.state.traverse;
    if (traverse) {
      const traveled = selected.analysis.samples.filter((s) => s.d <= traverse.distanceKm);
      traveled.push(traverse.position);
      this.#drawPath(traveled, { casing: '#3a3f4a', line: COLORS.traveled, width: 5.5 });
    }
  }

  #drawProbe() {
    const probe = this.state.probe;
    if (!probe) return;
    const p = this.worldToScreen(probe.x, probe.y);
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 7, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = COLORS.route;
    ctx.stroke();
  }

  #drawRover() {
    const traverse = this.state.traverse;
    if (!traverse) return;
    const { ctx } = this;
    const p = this.worldToScreen(traverse.position.x, traverse.position.y);
    ctx.save();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 16, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(76, 157, 255, 0.25)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(p.x, p.y, 9, 0, Math.PI * 2);
    ctx.fillStyle = '#4c9dff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.restore();
  }

  #drawPin(sx, sy, { color = COLORS.pin, letter = null } = {}) {
    const { ctx } = this;
    const head = sy - PIN_HEAD_OFFSET;
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.bezierCurveTo(sx - 4, sy - 8, sx - 12, head + 10, sx - 12, head);
    ctx.arc(sx, head, 12, Math.PI, 0);
    ctx.bezierCurveTo(sx + 12, head + 10, sx + 4, sy - 8, sx, sy);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = COLORS.pinStroke;
    ctx.stroke();
    if (letter) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(letter, sx, head + 1);
    } else {
      ctx.beginPath();
      ctx.arc(sx, head, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.pinStroke;
      ctx.fill();
    }
    ctx.restore();
  }

  #drawSampleMarker(sx, sy, color, user) {
    const { ctx } = this;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = color;
    ctx.fillRect(-6, -6, 12, 12);
    ctx.lineWidth = 2;
    ctx.strokeStyle = user ? '#ffffff' : '#12100f';
    ctx.strokeRect(-6, -6, 12, 12);
    ctx.restore();
  }

  #drawLandmark(sx, sy) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(sx, sy, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#e04b2f';
    ctx.stroke();
  }

  #drawStartMarker(sx, sy) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.arc(sx, sy, 8, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#1b1b1f';
    ctx.stroke();
  }

  #drawMarkers() {
    const { markers, stops, selectedMarkerId, droppedPin } = this.state;
    const labels = [];
    for (const m of markers) {
      if (m.kind === 'sample' && !this.layers.samples) continue;
      if (m.id === selectedMarkerId) continue;
      const p = this.worldToScreen(m.x, m.y);
      if (p.x < -20 || p.y < -20 || p.x > this.width + 20 || p.y > this.height + 20) continue;
      if (m.kind === 'sample') this.#drawSampleMarker(p.x, p.y, m.color, m.user);
      else this.#drawLandmark(p.x, p.y);
      labels.push({ text: m.name, x: p.x + 11, y: p.y + 4, priority: m.kind === 'landmark' ? 1.5 : 1 });
    }
    if (droppedPin) {
      const p = this.worldToScreen(droppedPin.x, droppedPin.y);
      this.#drawPin(p.x, p.y);
    }
    const selected = markers.find((m) => m.id === selectedMarkerId);
    if (selected) {
      const p = this.worldToScreen(selected.x, selected.y);
      this.#drawPin(p.x, p.y);
      labels.push({ text: selected.name, x: p.x + 15, y: p.y - PIN_HEAD_OFFSET + 4, priority: 3 });
    }
    stops.forEach((stop, index) => {
      const p = this.worldToScreen(stop.x, stop.y);
      if (index === 0) {
        this.#drawStartMarker(p.x, p.y);
        labels.push({ text: stop.name, x: p.x + 12, y: p.y + 4, priority: 2 });
      } else {
        this.#drawPin(p.x, p.y, { letter: LETTERS[index] });
        labels.push({ text: stop.name, x: p.x + 15, y: p.y - PIN_HEAD_OFFSET + 4, priority: 2 });
      }
    });
    this.#drawLabels(labels);
  }

  #drawLabels(labels) {
    const { ctx } = this;
    const placed = [];
    ctx.font = '600 12px system-ui, sans-serif';
    labels.sort((a, b) => b.priority - a.priority);
    for (const label of labels) {
      if (label.priority < 2 && this.view.scale < 60) continue;
      const w = ctx.measureText(label.text).width;
      const rect = { x: label.x - 2, y: label.y - 12, w: w + 4, h: 16 };
      const collides = placed.some(
        (r) => rect.x < r.x + r.w && rect.x + rect.w > r.x && rect.y < r.y + r.h && rect.y + rect.h > r.y,
      );
      if (collides && label.priority < 2) continue;
      placed.push(rect);
      this.#label(label.text, label.x, label.y);
    }
  }

  #label(text, x, y, { size = 12, color = '#ffffff' } = {}) {
    const { ctx } = this;
    ctx.save();
    ctx.font = `600 ${size}px system-ui, sans-serif`;
    ctx.lineJoin = 'round';
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = COLORS.labelHalo;
    ctx.strokeText(text, x, y);
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  #drawScaleBar() {
    const { ctx } = this;
    const ins = this.getInsets();
    const nice = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20];
    const km = nice.find((d) => d * this.view.scale >= 70) ?? 20;
    const px = km * this.view.scale;
    const x = ins.left + 16;
    const y = this.height - ins.bottom - 22;
    ctx.save();
    ctx.fillStyle = 'rgba(15, 11, 10, 0.72)';
    ctx.fillRect(x - 6, y - 18, px + 12, 28);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y - 4);
    ctx.lineTo(x, y + 2);
    ctx.lineTo(x + px, y + 2);
    ctx.lineTo(x + px, y - 4);
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = '11px system-ui, sans-serif';
    ctx.fillText(km < 1 ? `${Math.round(km * 1000)} m` : `${km} km`, x + 2, y - 7);
    ctx.restore();
  }
}
