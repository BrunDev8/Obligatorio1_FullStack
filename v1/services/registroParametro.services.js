import { isValidObjectId } from "mongoose";
import RegistroParametro from "../models/registroParametro.model.js";
import { obtenerEcosistemaPropioPorId } from "./ownership.service.js";

const crearErrorHttp = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const obtenerRegistroParametrosPorEcosistemaService = async (
  ecosistemaId,
  usuarioIdAutenticado,
) => {
  if (!isValidObjectId(ecosistemaId)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }
  await obtenerEcosistemaPropioPorId(ecosistemaId, usuarioIdAutenticado);
  return RegistroParametro.find({ ecosistemaId });
};

export const crearRegistroParametroService = async (
  registroParametroGuardar,
  usuarioIdAutenticado,
) => {
  if (!isValidObjectId(registroParametroGuardar.ecosistemaId)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }

  await obtenerEcosistemaPropioPorId(
    registroParametroGuardar.ecosistemaId,
    usuarioIdAutenticado,
  );

  const registroParametro = new RegistroParametro(registroParametroGuardar);
  await registroParametro.save();
  return registroParametro;
};


export const obtenerRegistrosPorEcosistemaService =
  obtenerRegistroParametrosPorEcosistemaService;
export const crearRegistroService = crearRegistroParametroService;
