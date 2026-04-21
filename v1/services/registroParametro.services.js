import { isValidObjectId } from "mongoose";
import RegistroParametro from "../models/registroParametro.model.js";

const crearErrorHttp = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const obtenerRegistroParametrosPorEcosistemaService = async (
  ecosistemaId,
) => {
  if (!isValidObjectId(ecosistemaId)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }
  return RegistroParametro.find({ ecosistemaId });
};

export const crearRegistroParametroService = async (
  registroParametroGuardar,
) => {
  if (!isValidObjectId(registroParametroGuardar.ecosistemaId)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }

  const registroParametro = new RegistroParametro(registroParametroGuardar);
  await registroParametro.save();
  return registroParametro;
};

export const eliminarRegistroParametroService = async (id) => {
  if (!isValidObjectId(id)) {
    throw crearErrorHttp("ID inválido", 400);
  }
  return RegistroParametro.findByIdAndDelete(id);
};

export const obtenerRegistrosPorEcosistemaService =
  obtenerRegistroParametrosPorEcosistemaService;
export const crearRegistroService = crearRegistroParametroService;
export const eliminarRegistroService = eliminarRegistroParametroService;
