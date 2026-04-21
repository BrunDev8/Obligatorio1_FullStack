import Usuario from "../models/usuario.model.js";
import { isValidObjectId } from "mongoose";

const createBadRequestError = (message) => {
  const error = new Error(message);
  error.status = 400;
  return error;
};

export const obtenerUsuarioPorIdService = async (id) => {
  if (!isValidObjectId(id)) {
    throw createBadRequestError("ID inválido");
  }

  return await Usuario.findById(id).select("-password");
};

export const actualizarUsuarioService = async (id, usuarioActualizar) => {
  if (!isValidObjectId(id)) {
    throw createBadRequestError("ID inválido");
  }

  return await Usuario.findByIdAndUpdate(id, usuarioActualizar, {
    new: true,
    runValidators: true,
  }).select("-password");
};
