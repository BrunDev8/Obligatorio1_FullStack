import { isValidObjectId } from "mongoose";
import Ecosistema from "../models/ecosistema.model.js";

const crearErrorHttp = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  return error;
};

export const obtenerEcosistemaPropioPorId = async (ecosistemaId, usuarioId) => {
  if (!isValidObjectId(ecosistemaId)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }

  if (!isValidObjectId(usuarioId)) {
    throw crearErrorHttp("ID de usuario inválido", 400);
  }

  const ecosistema = await Ecosistema.findById(ecosistemaId)
    .select("_id usuarioId")
    .lean();

  if (!ecosistema) {
    throw crearErrorHttp("Ecosistema no encontrado", 404);
  }

  if (String(ecosistema.usuarioId) !== String(usuarioId)) {
    throw crearErrorHttp("No tienes permiso para acceder a este ecosistema", 403);
  }

  return ecosistema;
};