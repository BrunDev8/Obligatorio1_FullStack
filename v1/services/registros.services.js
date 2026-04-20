import Registro from "../models/registro.model.js";
import { isValidObjectId } from "mongoose";


export const obtenerRegistrosPorEcosistemaService = async (ecosistemaId) => {
  if (!isValidObjectId(ecosistemaId)) {
    throw new Error("ID de ecosistema inválido");
  }
  return await Registro.find({ ecosistemaId });
};

export const crearRegistroService = async (registroGuardar) => {
  if (!isValidObjectId(registroGuardar.ecosistemaId)) {
    throw new Error("ID de ecosistema inválido");
  }

  const registro = new Registro(registroGuardar);
  await registro.save();
  return registro;
};

export const eliminarRegistroService = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Registro.findByIdAndDelete(id);
};
