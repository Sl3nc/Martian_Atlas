// Leitura e escrita de CSV (RFC 4180): aspas, vírgulas e quebras de linha em
// campos entre aspas, BOM UTF-8. Mantém o formato original dos datasets.

export function parseCsv(text) {
  const input = text.replace(/^﻿/, '');
  const rows = [];
  let row = [];
  let field = '';
  let quoted = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (quoted) {
      if (ch === '"' && input[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        quoted = false;
      } else {
        field += ch;
      }
    } else if (ch === '"') {
      quoted = true;
    } else if (ch === ',') {
      row.push(field);
      field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && input[i + 1] === '\n') i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else {
      field += ch;
    }
  }
  if (field !== '' || row.length) {
    row.push(field);
    rows.push(row);
  }

  const [header, ...body] = rows.filter((r) => r.length > 1 || r[0] !== '');
  if (!header) return { columns: [], records: [] };
  return {
    columns: header,
    records: body.map((values) => Object.fromEntries(header.map((name, k) => [name, values[k] ?? '']))),
  };
}

const needsQuotes = (value) => /[",\r\n]/.test(value);
const quote = (value) => `"${value.replace(/"/g, '""')}"`;

export function toCsv(records, columns, { quoteAll = false, bom = false, newline = '\n' } = {}) {
  const line = (values) =>
    values.map((v) => (quoteAll || needsQuotes(String(v)) ? quote(String(v)) : String(v))).join(',');
  const body = [line(columns), ...records.map((r) => line(columns.map((c) => r[c] ?? '')))].join(newline);
  return `${bom ? '﻿' : ''}${body}${newline}`;
}
