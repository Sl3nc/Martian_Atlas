// Sistema de coordenadas.
//
// A área do mapa é exatamente a extensão da imagem orbital fornecida
// (data/satellite_jezero.json, derivada do .vrt do QuickMap). Internamente
// trabalhamos em quilômetros locais: x cresce para leste a partir da borda
// oeste e y cresce para o SUL a partir da borda norte (como pixels de tela).
// A projeção é equiretangular, então lon/lat ↔ km é uma relação linear.

export const MARS_RADIUS_M = 3396190; // esfera Mars 2000 (IAU), a mesma do .vrt
export const BOUNDS = Object.freeze({
  west: 77.09195249988025,
  east: 78.28264750011974,
  north: 18.704286156726223,
  south: 18.112113843273775,
});

const REFERENCE_LAT = (BOUNDS.north + BOUNDS.south) / 2;
export const KM_PER_DEG_LAT = (2 * Math.PI * MARS_RADIUS_M) / 1000 / 360; // ≈ 59,27 km
export const KM_PER_DEG_LON = KM_PER_DEG_LAT * Math.cos((REFERENCE_LAT * Math.PI) / 180);

export const MAP_WIDTH_KM = (BOUNDS.east - BOUNDS.west) * KM_PER_DEG_LON; // ≈ 67 km
export const MAP_HEIGHT_KM = (BOUNDS.north - BOUNDS.south) * KM_PER_DEG_LAT; // ≈ 35 km

/** Resolução da grade de navegação. */
export const CELL_KM = 0.05;
export const GRID_WIDTH = Math.ceil(MAP_WIDTH_KM / CELL_KM);
export const GRID_HEIGHT = Math.ceil(MAP_HEIGHT_KM / CELL_KM);

export function lonLatToKm(lon, lat) {
  return { x: (lon - BOUNDS.west) * KM_PER_DEG_LON, y: (BOUNDS.north - lat) * KM_PER_DEG_LAT };
}

export function kmToLonLat(x, y) {
  return { lon: BOUNDS.west + x / KM_PER_DEG_LON, lat: BOUNDS.north - y / KM_PER_DEG_LAT };
}

export function isInsideMap(x, y) {
  return x >= 0 && y >= 0 && x < MAP_WIDTH_KM && y < MAP_HEIGHT_KM;
}

// Easting/northing do dataset de amostras M2020: equiretangular com
// latitude de escala verdadeira de 18,4663° (ajustada a partir dos próprios dados).
const SAMPLES_TRUE_SCALE_LAT = 18.4663;
export function toEastingNorthing(lon, lat) {
  const rad = Math.PI / 180;
  return {
    easting: MARS_RADIUS_M * Math.cos(SAMPLES_TRUE_SCALE_LAT * rad) * lon * rad,
    northing: MARS_RADIUS_M * lat * rad,
  };
}

// ---------- Tempo marciano ----------

const SOL_MS = 88775244; // 24 h 39 min 35,244 s
const M2020_LANDING_UTC = Date.UTC(2021, 1, 18, 20, 55); // pouso = sol 0

/** Sol da missão Mars 2020 estimado para uma data terrestre. */
export function estimateMissionSol(date = new Date()) {
  return Math.max(0, Math.floor((date.getTime() - M2020_LANDING_UTC) / SOL_MS));
}

// ---------- Formatação ----------

const formatters = new Map();
export function formatNumber(value, digits = 0) {
  if (!formatters.has(digits)) {
    formatters.set(
      digits,
      new Intl.NumberFormat('pt-BR', { minimumFractionDigits: digits, maximumFractionDigits: digits }),
    );
  }
  return formatters.get(digits).format(value);
}

export function formatDistance(km) {
  if (km < 1) return `${formatNumber(Math.round(km * 1000))} m`;
  return `${formatNumber(km, km < 10 ? 2 : 1)} km`;
}

export function formatElevation(m) {
  return `${formatNumber(Math.round(m))} m`;
}

export function formatDuration(hours) {
  if (hours < 1) return `${Math.max(1, Math.round(hours * 60))} min`;
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m ? `${h} h ${m} min` : `${h} h`;
}

export function formatLonLat(lon, lat, digits = 4) {
  return `${formatNumber(Math.abs(lat), digits)}° ${lat >= 0 ? 'N' : 'S'}, ${formatNumber(Math.abs(lon), digits)}° ${lon >= 0 ? 'L' : 'O'}`;
}

export function formatKmPosition(x, y, digits = 4) {
  const { lon, lat } = kmToLonLat(x, y);
  return formatLonLat(lon, lat, digits);
}

/** Rumo em graus (0 = norte, 90 = leste) para um deslocamento em km locais. */
export function headingDeg(dx, dy) {
  return ((Math.atan2(dx, -dy) * 180) / Math.PI + 360) % 360;
}

const CARDINALS = ['norte', 'nordeste', 'leste', 'sudeste', 'sul', 'sudoeste', 'oeste', 'noroeste'];
export function cardinal(heading) {
  return CARDINALS[Math.round(heading / 45) % 8];
}
