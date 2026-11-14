// Camadas raster pré-renderizadas: relevo (DEM real), declividade e satélite.

import { clamp } from '../lib/math.js';
import { MAX_SLOPE_DEG } from '../core/world.js';

const PALETTE = [
  [0.0, [38, 52, 98]],
  [0.15, [52, 110, 140]],
  [0.3, [96, 160, 120]],
  [0.5, [200, 190, 110]],
  [0.7, [196, 120, 70]],
  [0.85, [150, 80, 60]],
  [1.0, [240, 225, 215]],
];
const VERTICAL_EXAGGERATION = 4;

function paletteColor(t) {
  for (let k = 1; k < PALETTE.length; k++) {
    const [t1, c1] = PALETTE[k];
    if (t <= t1) {
      const [t0, c0] = PALETTE[k - 1];
      const f = (t - t0) / (t1 - t0);
      return [c0[0] + (c1[0] - c0[0]) * f, c0[1] + (c1[1] - c0[1]) * f, c0[2] + (c1[2] - c0[2]) * f];
    }
  }
  return PALETTE[PALETTE.length - 1][1];
}

function makeCanvas(width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

/** Relevo hipsométrico (cor por altitude) com sombreamento vindo do noroeste. */
export function renderRelief(world) {
  const { width, height, elevation } = world;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(width, height);
  let min = Infinity;
  let max = -Infinity;
  for (const e of elevation) {
    min = Math.min(min, e);
    max = Math.max(max, e);
  }
  const cellM = world.cellKm * 1000;
  const alt = (40 * Math.PI) / 180;
  const lx = -Math.cos(alt) * Math.SQRT1_2;
  const ly = -Math.cos(alt) * Math.SQRT1_2;
  const lz = Math.sin(alt);
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const k = j * width + i;
      const il = j * width + Math.max(0, i - 1);
      const ir = j * width + Math.min(width - 1, i + 1);
      const ju = Math.max(0, j - 1) * width + i;
      const jd = Math.min(height - 1, j + 1) * width + i;
      const dzdx = ((elevation[ir] - elevation[il]) / (2 * cellM)) * VERTICAL_EXAGGERATION;
      const dzdy = ((elevation[jd] - elevation[ju]) / (2 * cellM)) * VERTICAL_EXAGGERATION;
      const shade = Math.max(0, (-dzdx * lx - dzdy * ly + lz) / Math.hypot(dzdx, dzdy, 1)) / lz;
      const light = clamp(0.35 + 0.65 * shade, 0.2, 1.3);
      const [r, g, b] = paletteColor((elevation[k] - min) / (max - min));
      image.data[k * 4] = clamp(r * light, 0, 255);
      image.data[k * 4 + 1] = clamp(g * light, 0, 255);
      image.data[k * 4 + 2] = clamp(b * light, 0, 255);
      image.data[k * 4 + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  return { canvas, min, max };
}

/** Declividade: transparente no plano, vermelho perto do limite transponível. */
export function renderSlope(world) {
  const { width, height, slope } = world;
  const canvas = makeCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const image = ctx.createImageData(width, height);
  for (let k = 0; k < slope.length; k++) {
    const s = slope[k];
    if (s < 4) continue;
    const o = k * 4;
    if (s > MAX_SLOPE_DEG) {
      image.data.set([150, 0, 40, 210], o);
    } else {
      const t = clamp((s - 4) / (MAX_SLOPE_DEG - 4), 0, 1);
      image.data.set([255, Math.round(230 - 200 * t), 40, Math.round(60 + 130 * t)], o);
    }
  }
  ctx.putImageData(image, 0, 0);
  return canvas;
}

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
    img.src = src;
  });
}
