import { isValidObjectId } from "mongoose";
import { obtenerCategoriasService, crearCategoriaService, actualizarCategoriaService, eliminarCategoriaService } from "../services/categorias.services.js";

const ejecutar = (fn) => async (req, res, next) => {
  try { return res.json({ data: await fn(req) }); } catch (error) { return next(error); }
};
const validarId = (id) => { if (!isValidObjectId(id)) { const error = new Error("ID de categoría inválido"); error.statusCode = 400; throw error; } };
export const obtenerCategorias = ejecutar(() => obtenerCategoriasService());
export const agregarCategoria = ejecutar((req) => crearCategoriaService(req.validatedBody || req.body));
export const editarCategoria = async (req, res, next) => { try { validarId(req.params.id); const data = await actualizarCategoriaService(req.params.id, req.validatedBody || req.body); if (!data) return res.status(404).json({ message: "Categoría no encontrada" }); return res.json({ data }); } catch (error) { next(error); } };
export const eliminarCategoria = async (req, res, next) => { try { validarId(req.params.id); const data = await eliminarCategoriaService(req.params.id); if (!data) return res.status(404).json({ message: "Categoría no encontrada" }); return res.json({ data }); } catch (error) { next(error); } };
