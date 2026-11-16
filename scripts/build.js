// Gera a pasta dist/ pronta para deploy estático (Vercel, Netlify, Cloudflare Pages, GitHub Pages, Render, etc.).
import { cp, mkdir, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)));
const DIST = resolve(ROOT, 'dist');

const ITEMS = ['index.html', 'css', 'js', 'data', 'assets'];

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

for (const item of ITEMS) {
  const src = resolve(ROOT, item);
  if (existsSync(src)) {
    await cp(src, resolve(DIST, item), { recursive: true });
  }
}

console.log('Build concluído em dist/');
