import axios from 'axios';

const GBIF_BASE = 'https://api.gbif.org/v1/species/search';
const TIMEOUT_MS = 3000;
const MAX_ATTEMPTS = 2; 

const http = axios.create({ timeout: TIMEOUT_MS, headers: { Accept: 'application/json' } });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchSpeciesByName = async (name) => {
  if (!name) return [];

  const url = `${GBIF_BASE}?q=${encodeURIComponent(name)}&limit=10`;
  let attempts = 0;

  while (attempts < MAX_ATTEMPTS) {
    try {
      const { data } = await http.get(url);
      if (!data || !Array.isArray(data.results)) return [];

      const mapped = (data.results || []).slice(0, 10).map((item) => ({
        scientificName: item.scientificName || null,
        canonicalName: item.canonicalName || null,
        family: item.family || null,
        kingdom: item.kingdom || null,
      }));

      return mapped;
    } catch (err) {
      attempts += 1;
      const isTimeout = err.code === 'ECONNABORTED';
      const isServerError = err.response && err.response.status >= 500;
      const isNetworkError = !err.response;

      const shouldRetry = attempts < MAX_ATTEMPTS && (isTimeout || isNetworkError || isServerError);

      console.error('Solicitud a GBIF fallida', { intento: attempts, mensaje: err?.message });

      if (!shouldRetry) {
        return [];
      }

      await sleep(200);
    }
  }

  return [];
};
