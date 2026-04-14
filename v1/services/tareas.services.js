import Tarea from "../models/tarea.model.js";

export const obtenerTareasPorEcosistemaService = async (ecosistemaId) => {
  return await Tarea.find({ ecosistemaId });
};

export const obtenerTareaPorIdService = async (id) => {
  return await Tarea.findById(id);
};

export const crearTareaService = async (tareaGuardar) => {
  const tarea = new Tarea(tareaGuardar);
  await tarea.save();
  return tarea;
};

export const actualizarTareaService = async (id, tareaActualizar) => {
  return await Tarea.findByIdAndUpdate(id, tareaActualizar, { new: true });
};

export const eliminarTareaService = async (id) => {
  return await Tarea.findByIdAndDelete(id);
};

export default {
  obtenerTareasPorEcosistemaService,
  obtenerTareaPorIdService,
  crearTareaService,
  actualizarTareaService,
  eliminarTareaService,
};
