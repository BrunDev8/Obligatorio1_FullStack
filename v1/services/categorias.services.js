import { isValidObjectId } from "mongoose";
import Categoria from "../models/categoria.model.js";
import Ecosistema from "../models/ecosistema.model.js";
import { obtenerCategoriaPropiaPorId } from "./ownership.service.js";

const crearErrorHttp = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  return error;
};

export const obtenerCategoriasService = async (usuarioId) => {
  if (!isValidObjectId(usuarioId)) {
    throw crearErrorHttp("ID de usuario inválido", 400);
  }

  return await Categoria.find({ usuarioId });
};

export const crearCategoriaService = async (categoriaGuardar, usuarioId) => {
  if (!isValidObjectId(usuarioId)) {
    throw crearErrorHttp("ID de usuario inválido", 400);
  }

  const categoria = new Categoria({
    ...categoriaGuardar,
    usuarioId,
  });
  await categoria.save();
  return categoria;
};

export const actualizarCategoriaService = async (id, categoriaActualizar, usuarioId) => {
  await obtenerCategoriaPropiaPorId(id, usuarioId);

  const { usuarioId: usuarioIdCategoria, ...actualizacion } = categoriaActualizar;

  return await Categoria.findOneAndUpdate({ _id: id, usuarioId }, actualizacion, {
    new: true,
    runValidators: true,
  });
};

export const eliminarCategoriaService = async (id, usuarioId) => {
  await obtenerCategoriaPropiaPorId(id, usuarioId);

  const ecosistemasRelacionados = await Ecosistema.countDocuments({
    categoriaId: id,
    usuarioId,
  });

  if (ecosistemasRelacionados > 0) {
    throw crearErrorHttp(
      "No se puede eliminar la categoría porque tiene ecosistemas asociados",
      400,
    );
  }

  return await Categoria.findOneAndDelete({ _id: id, usuarioId });
};
