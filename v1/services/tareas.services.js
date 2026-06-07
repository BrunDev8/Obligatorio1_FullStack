import Tarea from "../models/tarea.model.js";
import { obtenerEcosistemaPropioPorId } from "./ownership.service.js";

export const obtenerTareasPorEcosistemaService = async (ecosistemaId, usuarioIdAutenticado) => {
  await obtenerEcosistemaPropioPorId(ecosistemaId, usuarioIdAutenticado);
  return await Tarea.find({ ecosistemaId });
};

export const crearTareaService = async (tareaGuardar, usuarioIdAutenticado) => {
  await obtenerEcosistemaPropioPorId(tareaGuardar.ecosistemaId, usuarioIdAutenticado);
  const tarea = new Tarea(tareaGuardar);
  await tarea.save();
  return tarea;
};

