import Tarea from "../models/tarea.model.js";

export const obtenerTareasPorEcosistemaService = async (ecosistemaId) => {  
  if (!isValidObjectId(ecosistemaId)) {
    throw new Error("ID de ecosistema inválido");
  }
  return await Tarea.find({ ecosistemaId });
};

export const obtenerTareaPorIdService = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
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
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Tarea.findByIdAndDelete(id);
};

export default {
  obtenerTareasPorEcosistemaService,
  obtenerTareaPorIdService,
  crearTareaService,
  actualizarTareaService,
  eliminarTareaService,
};
