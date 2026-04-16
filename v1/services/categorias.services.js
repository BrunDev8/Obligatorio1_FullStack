import { isValidObjectId } from "mongoose";
import Categoria from "../models/categoria.model.js";

export const obtenerCategoriasService = async () => {
  return await Categoria.find();
};

export const obtenerCategoriaPorIdService = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Categoria.findById(id);
};

export const crearCategoriaService = async (categoriaGuardar) => {
  const categoria = new Categoria(categoriaGuardar);
  await categoria.save();
  return categoria;
};

export const actualizarCategoriaService = async (id, categoriaActualizar) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Categoria.findByIdAndUpdate(id, categoriaActualizar, { new: true });
};

export const eliminarCategoriaService = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Categoria.findByIdAndDelete(id);
};

export default {
  obtenerCategoriasService,
  obtenerCategoriaPorIdService,
  crearCategoriaService,
  actualizarCategoriaService,
  eliminarCategoriaService,
};
