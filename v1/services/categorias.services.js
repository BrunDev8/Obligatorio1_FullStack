import Categoria from "../models/categoria.model.js";

export const obtenerCategoriasService = () => Categoria.find().sort({ createdAt: -1 });
export const crearCategoriaService = (datos) => Categoria.create(datos);
export const actualizarCategoriaService = (id, datos) => Categoria.findByIdAndUpdate(id, datos, { new: true, runValidators: true });
export const eliminarCategoriaService = (id) => Categoria.findByIdAndDelete(id);
