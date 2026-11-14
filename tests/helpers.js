import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { loadDatasets } from '../js/data/datasets.js';
import { createWorld } from '../js/core/world.js';

const root = new URL('../', import.meta.url);
const path = (p) => fileURLToPath(new URL(p, root));

export function loadFromDisk() {
  return loadDatasets({
    readText: (p) => readFile(path(p), 'utf8'),
    readBinary: async (p) => {
      const buf = await readFile(path(p));
      return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
    },
  });
}

export async function loadWorld() {
  const data = await loadFromDisk();
  return { data, world: createWorld({ dem: data.dem, obstacles: data.obstacles }) };
}
