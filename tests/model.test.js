import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { parseCsv, toCsv } from '../js/model/csv.js';
import { OBSTACLE_COLUMNS, parseObstacle, serializeObstacle, createUserObstacle, validateObstacle } from '../js/model/obstacles.js';
import { SAMPLE_COLUMNS, parseSample, serializeSample, createSample } from '../js/model/samples.js';
import { toEastingNorthing } from '../js/core/geo.js';

const read = (p) => readFile(new URL(`../${p}`, import.meta.url), 'utf8');

test('parseCsv lida com BOM, aspas, vírgulas e CRLF', () => {
  const { columns, records } = parseCsv('﻿"a","b"\r\n"1","x, ""y"""\r\n');
  assert.deepEqual(columns, ['a', 'b']);
  assert.deepEqual(records, [{ a: '1', b: 'x, "y"' }]);
});

test('dataset de empecilhos: todas as linhas seguem o modelo e fazem ida e volta', async () => {
  const { columns, records } = parseCsv(await read('data/jezero_obstacles_v2_clean.csv'));
  assert.deepEqual(columns, OBSTACLE_COLUMNS);
  for (const row of records) {
    const back = serializeObstacle(parseObstacle(row));
    for (const c of ['obstacle_id', 'obstacle_type', 'criticality_level', 'passable_by_rover', 'is_dynamic_report', 'description']) {
      assert.equal(back[c], row[c], `${row.obstacle_id}.${c}`);
    }
    assert.equal(Number(back.lat), Number(row.lat));
  }
});

test('dataset de amostras: todas as linhas seguem o modelo', async () => {
  const { columns, records } = parseCsv(await read('data/M2020_amostras_armazenadas.csv'));
  assert.deepEqual(columns, SAMPLE_COLUMNS);
  for (const row of records) assert.equal(serializeSample(parseSample(row)).sample_id, row.sample_id);
});

test('easting/northing calculados batem com o dataset (< 1 m)', async () => {
  const { records } = parseCsv(await read('data/M2020_amostras_armazenadas.csv'));
  for (const row of records) {
    const { easting, northing } = toEastingNorthing(Number(row.longitude), Number(row.latitude));
    assert.ok(Math.abs(easting - Number(row.easting)) < 1, row.sample_id);
    assert.ok(Math.abs(northing - Number(row.northing)) < 1, row.sample_id);
  }
});

test('criticidade fora de 1–5 é rejeitada', () => {
  const base = { name: 'X', type: 'crater', lat: 18.4, lon: 77.4, radiusM: 20, passable: false };
  for (const criticality of [0, 6, 2.5]) {
    const r = createUserObstacle({ ...base, criticality }, { elevationM: -2500, slopeDeg: 5 }, []);
    assert.ok(r.errors?.some((e) => e.includes('criticality_level')), String(criticality));
  }
});

test('empecilho do usuário recebe id sequencial, fonte dinâmica e severidade padrão', () => {
  const terrain = { elevationM: -2500, slopeDeg: 4 };
  const input = { name: 'Bloco', type: 'boulder_field', lat: 18.45, lon: 77.42, radiusM: 30, criticality: 4, passable: true };
  const first = createUserObstacle(input, terrain, []).obstacle;
  const second = createUserObstacle(input, terrain, [first]).obstacle;
  assert.equal(first.id, 'DYNAMIC_USER_001');
  assert.equal(second.id, 'DYNAMIC_USER_002');
  assert.equal(first.sourceDataset, 'User_Dynamic_Hazard_Report');
  assert.equal(first.isDynamic, true);
  assert.equal(first.severity, 0.75);
  assert.deepEqual(validateObstacle(first), []);
  const csv = toCsv([serializeObstacle(first)], OBSTACLE_COLUMNS, { quoteAll: true });
  assert.equal(parseObstacle(parseCsv(csv).records[0]).id, first.id);
});

test('novo ponto científico segue o padrão de sample_id', () => {
  const existing = [{ id: 'M2020-00639-21' }];
  const r = createSample({ targetName: 'Alvo', type: 'core', sol: 1500, lon: 77.4, lat: 18.45 }, { elevationM: -2500 }, existing);
  assert.equal(r.sample.id, 'M2020-01500-22');
  assert.ok(createSample({ targetName: '', type: 'core', sol: 1, lon: 77.4, lat: 18.45 }, { elevationM: 0 }, []).errors);
  assert.ok(createSample({ targetName: 'A', type: 'gas', sol: 1, lon: 77.4, lat: 18.45 }, { elevationM: 0 }, []).errors);
});
