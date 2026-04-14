import Categoria from "../models/categoria.model.js";

export const obtenerCategoriasService = async () => {
  return await Categoria.find();
};

export const obtenerCategoriaPorIdService = async (id) => {
  return await Categoria.findById(id);
};

export const crearCategoriaService = async (categoriaGuardar) => {
  const categoria = new Categoria(categoriaGuardar);
  await categoria.save();
  return categoria;
};

export const actualizarCategoriaService = async (id, categoriaActualizar) => {
  return await Categoria.findByIdAndUpdate(id, categoriaActualizar, { new: true });
};

export const eliminarCategoriaService = async (id) => {
  return await Categoria.findByIdAndDelete(id);
};

export default {
  obtenerCategoriasService,
  obtenerCategoriaPorIdService,
  crearCategoriaService,
  actualizarCategoriaService,
  eliminarCategoriaService,
};
