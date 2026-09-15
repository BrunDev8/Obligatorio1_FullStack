import { isValidObjectId } from "mongoose";
import Categoria from "../models/categoria.model.js";
import Ecosistema from "../models/ecosistema.model.js";
import Tarea from "../models/tarea.model.js";
import RegistroParametro from "../models/registroParametro.model.js";

const errorHttp = (message, statusCode) => Object.assign(new Error(message), { statusCode });
const comprobarCategoria = async (categoriaId) => {
  if (!isValidObjectId(categoriaId)) throw errorHttp("ID de categoría inválido", 400);
  if (!await Categoria.exists({ _id: categoriaId })) throw errorHttp("Categoría no encontrada", 404);
};
const poblarCategoria = (consulta) => consulta.populate("categoriaId");

export const obtenerEcosistemasService = async ({ categoriaTipo } = {}) => {
  const filtro = {};
  if (categoriaTipo) {
    const categorias = await Categoria.find({ tipo: categoriaTipo }).select("_id");
    filtro.categoriaId = { $in: categorias.map((categoria) => categoria._id) };
  }
  return poblarCategoria(Ecosistema.find(filtro).sort({ createdAt: -1 }));
};
export const buscarEcosistemasPorCategoriaService = async (categoriaId) => {
  if (!isValidObjectId(categoriaId)) throw errorHttp("ID de categoría inválido", 400);
  return poblarCategoria(Ecosistema.find({ categoriaId }).sort({ createdAt: -1 }));
};
export const crearEcosistemaService = async (datos) => {
  if (datos.categoriaId !== undefined) await comprobarCategoria(datos.categoriaId);
  const ecosistema = await Ecosistema.create(datos);
  return poblarCategoria(Ecosistema.findById(ecosistema._id));
};
export const actualizarEcosistemaService = async (id, datos) => {
  if (datos.categoriaId !== undefined) await comprobarCategoria(datos.categoriaId);
  return poblarCategoria(Ecosistema.findByIdAndUpdate(id, datos, { new: true, runValidators: true }));
};
export const eliminarEcosistemaService = async (id) => {
  const eliminado = await Ecosistema.findByIdAndDelete(id);
  if (eliminado) await Promise.all([Tarea.deleteMany({ ecosistemaId: id }), RegistroParametro.deleteMany({ ecosistemaId: id })]);
  return eliminado;
};
