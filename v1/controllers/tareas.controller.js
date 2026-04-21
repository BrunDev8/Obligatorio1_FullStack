import {
  obtenerTareasPorEcosistemaService,
  crearTareaService,
  actualizarTareaService,
} from "../services/tareas.services.js";

export const obtenerTareasPorEcosistema = async (req, res) => {
  try {
    const ecosistemaId = req.params.ecosistemaId;
    const tareas = await obtenerTareasPorEcosistemaService(ecosistemaId);
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
    const tarea = await crearTareaService(tareaGuardar);
    res
      .status(201)
      .json({ success: true, message: "Tarea creada", data: tarea });
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

export const actualizarTarea = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.validatedBody || req.body;
    const tarea = await actualizarTareaService(id, { ...body });
    if (!tarea)
      return res
        .status(404)
        .json({ success: false, message: "Tarea no encontrada" });
    res.json({ success: true, message: "Tarea actualizada", data: tarea });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error al actualizar tarea",
        error: err.message,
      });
  }
};
