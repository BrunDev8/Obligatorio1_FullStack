import { obtenerRegistrosPorEcosistemaService, crearRegistroService } from "../services/registros.services.js";

export const obtenerRegistrosPorEcosistema = async (req, res) => {
  try {
    const ecosistemaId = req.params.ecosistemaId;
    const registros = await obtenerRegistrosPorEcosistemaService(ecosistemaId);
    res.json({ success: true, message: "Registros obtenidos", data: registros });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al obtener registros", error: err.message });
  }
};

export const agregarRegistro = async (req, res) => {
  try {
    const body = req.validatedBody || req.body;
    const registroGuardar = {
      ecosistemaId: body.ecosistemaId,
      temperatura: body.temperatura,
      ph: body.ph,
      humedad: body.humedad,
      nitratos: body.nitratos,
      notas: body.notas || "",
      fechaRegistro: body.fechaRegistro ? new Date(body.fechaRegistro) : new Date(),
    };
    const registro = await crearRegistroService(registroGuardar);
    res.status(201).json({ success: true, message: "Registro creado", data: registro });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al crear registro", error: err.message });
  }
};

export default { obtenerRegistrosPorEcosistema };
