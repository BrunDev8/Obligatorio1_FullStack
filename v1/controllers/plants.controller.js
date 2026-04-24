import { searchSpeciesByName } from '../services/gbif.service.js';

export const searchPlants = async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ success: false, message: "El query param 'name' es requerido" });
    }

    const results = await searchSpeciesByName(name);

    if (!Array.isArray(results) || results.length === 0) {
      return res.json({ success: true, message: 'No se encontraron resultados', data: [] });
    }

    return res.json({ success: true, message: 'Resultados obtenidos', data: results });
  } catch (err) {
    return res
      .status(err.statusCode || 500)
      .json({ success: false, message: 'Error buscando plantas', error: err.message });
  }
};
