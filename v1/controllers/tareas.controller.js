import {
  obtenerTareasPorEcosistemaService,
  crearTareaService,
} from "../services/tareas.services.js";

export const obtenerTareasPorEcosistema = async (req, res) => {
  try {
    const usuarioId = req.user?.id || req.decoded?.id;
    const ecosistemaId = req.params.ecosistemaId;
    const tareas = await obtenerTareasPorEcosistemaService(ecosistemaId, usuarioId);
    if (Array.isArray(tareas) && tareas.length === 0) {
      return res.json({ success: true, message: "No se encontraron tareas para el ecosistema", data: tareas });
    }

    res.json({ success: true, message: "Tareas obtenidas", data: tareas });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error al obtener tareas",
        error: err.message,
      });
  }
};

export const agregarTarea = async (req, res) => {
  try {
    const usuarioId = req.user?.id || req.decoded?.id;
    const body = req.validatedBody || req.body;
    const tareaGuardar = {
      ecosistemaId: body.ecosistemaId,
      titulo: body.titulo,
      descripcion: body.descripcion || "",
      tipo: body.tipo,
      frecuencia: body.frecuencia,
      ultimaEjecucion: body.ultimaEjecucion
        ? new Date(body.ultimaEjecucion)
        : null,
      proximaEjecucion: body.proximaEjecucion
        ? new Date(body.proximaEjecucion)
        : null,
      completada: !!body.completada,
    };
    const tarea = await crearTareaService(tareaGuardar, usuarioId);
    if (!tarea) {
      return res.status(500).json({ success: false, message: "No se pudo crear la tarea" });
    }
    res.status(201).json({ success: true, message: "Tarea creada", data: tarea });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error al crear tarea",
        error: err.message,
      });
  }
};

