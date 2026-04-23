import Tarea from "../models/tarea.model.js";
import { isValidObjectId } from "mongoose";

export const obtenerTareasPorEcosistemaService = async (ecosistemaId) => {
  if (!isValidObjectId(ecosistemaId)) {
    throw new Error("ID de ecosistema inválido");
  }
  return await Tarea.find({ ecosistemaId });
};

export const crearTareaService = async (tareaGuardar) => {
  const tarea = new Tarea(tareaGuardar);
  await tarea.save();
  return tarea;
};

