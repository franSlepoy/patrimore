// src/services/mindicador.js
import axios from "axios";

const API_BASE = "https://mindicador.cl/api";

// -------------------- helpers ------------------------

async function apiGet(url, params = {}) {
  try {
    const { data } = await axios.get(url, { params });
    return data;
  } catch (err) {
    console.error(`Mindicador API error (${url})`, err);
    throw err;
  }
}

// -------------------- endpoints -----------------------

export async function getLatest() {
  // Valores actuales de todos los indicadores
  return apiGet(API_BASE);
}

/**
 * Serie histórica de un indicador en un año.
 * - Para desempleo la API no soporta /{year}; se trae todo y se filtra.
 * - Para el resto sí funciona /{indicator}/{year}
 */
export async function getIndicatorYear(type, year) {
  if (type === "desempleo") {
    const all = await apiGet(`${API_BASE}/desempleo`);
    const serieDelAño = all.serie.filter(
      (p) => new Date(p.fecha).getFullYear() === year
    );
    return { serie: serieDelAño };
  }

  return apiGet(`${API_BASE}/${type}/${year}`);
}

/**
 * Valor de un indicador en una fecha específica (opcional).
 */
export async function getIndicatorByDate(type, dateStr) {
  return apiGet(`${API_BASE}/${type}/${dateStr}`);
}
