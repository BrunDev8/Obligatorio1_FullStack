import {
  obtenerRegistroParametrosPorEcosistemaService,
  crearRegistroParametroService,
} from "../services/registroParametro.services.js";

export const obtenerRegistroParametrosPorEcosistema = async (req, res) => {
  try {
    const ecosistemaId = req.params.ecosistemaId;
    const registroParametros =
      await obtenerRegistroParametrosPorEcosistemaService(ecosistemaId);
    res.json({
      success: true,
      message: "Registros de parámetros obtenidos",
      data: registroParametros,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: "Error al obtener registros de parámetros",
      error: err.message,
    });
  }
};

export const agregarRegistroParametro = async (req, res) => {
  try {
    const body = req.validatedBody || req.body;
    const registroParametroGuardar = {
      ecosistemaId: body.ecosistemaId,
      temperatura: body.temperatura,
      ph: body.ph,
      humedad: body.humedad,
      nitratos: body.nitratos,
      notas: body.notas || "",
      fechaRegistro: body.fechaRegistro
        ? new Date(body.fechaRegistro)
        : new Date(),
    };
    const registroParametro = await crearRegistroParametroService(
      registroParametroGuardar,
    );
    res
      .status(201)
      .json({
        success: true,
        message: "Registro de parámetros creado",
        data: registroParametro,
      });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: "Error al crear registro de parámetros",
      error: err.message,
    });
  }
};

export const obtenerRegistrosPorEcosistema =
  obtenerRegistroParametrosPorEcosistema;
export const agregarRegistro = agregarRegistroParametro;
