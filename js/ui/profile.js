// Gráfico de perfil de elevação da rota, com hover sincronizado ao mapa.

import { formatDistance, formatElevation } from '../core/geo.js';

const PAD = { left: 52, right: 10, top: 10, bottom: 22 };

export class ElevationProfile {
  constructor(canvas, samples, { onHover, tooltip } = {}) {
    this.canvas = canvas;
    this.samples = samples;
    this.onHover = onHover;
    this.tooltip = tooltip;
    this.hoverIndex = -1;
    canvas.addEventListener('pointermove', (e) => this.#hover(e));
    canvas.addEventListener('pointerleave', () => this.#leave());
    this.resize();
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

  #range() {
    let min = Infinity;
    let max = -Infinity;
    for (const s of this.samples) {
      min = Math.min(min, s.e);
      max = Math.max(max, s.e);
    }
    const padding = Math.max(10, (max - min) * 0.1);
    return { min: min - padding, max: max + padding };
  }

  draw() {
    const { samples } = this;
    const ctx = this.canvas.getContext('2d');
    if (!this.width || samples.length < 2) return;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.width, this.height);

    const total = samples[samples.length - 1].d || 1;
    const { min, max } = this.#range();
    const w = this.width - PAD.left - PAD.right;
    const h = this.height - PAD.top - PAD.bottom;
    const sx = (d) => PAD.left + (d / total) * w;
    const sy = (e) => PAD.top + (1 - (e - min) / (max - min)) * h;
    this.toX = sx;

    // Faixas de areia ao fundo.
    ctx.fillStyle = 'rgba(246, 206, 120, 0.22)';
    for (let i = 1; i < samples.length; i++) {
      if (samples[i].sand) ctx.fillRect(sx(samples[i - 1].d), PAD.top, sx(samples[i].d) - sx(samples[i - 1].d) + 0.5, h);
    }

    const gradient = ctx.createLinearGradient(0, PAD.top, 0, PAD.top + h);
    gradient.addColorStop(0, 'rgba(76, 157, 255, 0.45)');
    gradient.addColorStop(1, 'rgba(76, 157, 255, 0.02)');
    ctx.beginPath();
    ctx.moveTo(sx(0), PAD.top + h);
    for (const s of samples) ctx.lineTo(sx(s.d), sy(s.e));
    ctx.lineTo(sx(total), PAD.top + h);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    samples.forEach((s, i) => (i === 0 ? ctx.moveTo(sx(s.d), sy(s.e)) : ctx.lineTo(sx(s.d), sy(s.e))));
    ctx.strokeStyle = '#4c9dff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255, 240, 230, 0.7)';
    ctx.font = '10px system-ui, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(formatElevation(max), PAD.left - 6, PAD.top + 8);
    ctx.fillText(formatElevation(min), PAD.left - 6, PAD.top + h);
    ctx.textAlign = 'left';
    ctx.fillText('0', PAD.left, this.height - 6);
    ctx.textAlign = 'right';
    ctx.fillText(formatDistance(total), PAD.left + w, this.height - 6);

    if (this.hoverIndex >= 0) {
      const s = samples[this.hoverIndex];
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(sx(s.d), PAD.top);
      ctx.lineTo(sx(s.d), PAD.top + h);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(sx(s.d), sy(s.e), 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
    }
  }

  #hover(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const total = this.samples[this.samples.length - 1].d;
    const w = this.width - PAD.left - PAD.right;
    const d = Math.min(Math.max((x - PAD.left) / w, 0), 1) * total;
    let lo = 0;
    let hi = this.samples.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (this.samples[mid].d < d) lo = mid + 1;
      else hi = mid;
    }
    this.hoverIndex = lo;
    const s = this.samples[lo];
    this.draw();
    this.onHover?.(s);
    if (this.tooltip) {
      this.tooltip.hidden = false;
      this.tooltip.textContent = `${formatDistance(s.d)} · ${formatElevation(s.e)} · ${Math.round(s.slope)}°${s.sand ? ' · areia' : ''}`;
    }
  }

  #leave() {
    this.hoverIndex = -1;
    this.draw();
    this.onHover?.(null);
    if (this.tooltip) this.tooltip.hidden = true;
  }
}
