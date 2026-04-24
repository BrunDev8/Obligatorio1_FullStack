import Ecosistema from "../models/ecosistema.model.js";
import Usuario from "../models/usuario.model.js";
import Categoria from "../models/categoria.model.js";
import { isValidObjectId } from "mongoose";

const crearErrorHttp = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.status = statusCode;
  return error;
};

const categoriaProyeccion = "nombre tipo descripcion";

const escaparExpresionRegular = (valor) =>
  valor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const validarCategoriaExistente = async (categoriaId) => {
  if (!isValidObjectId(categoriaId)) {
    throw crearErrorHttp("ID de categoría inválido", 400);
  }

  const categoria = await Categoria.findById(categoriaId).select("_id").lean();
  if (!categoria) {
    throw crearErrorHttp("Categoría no encontrada", 404);
  }
};

const poblarCategoria = (consulta) =>
  consulta.populate({ path: "categoriaId", select: categoriaProyeccion });

export const obtenerEcosistemasService = async ({ categoriaTipo, page = 1, limit = 10 } = {}) => {
  const tipoNormalizado = typeof categoriaTipo === "string" ? categoriaTipo.trim() : "";
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  if (tipoNormalizado) {
    const categorias = await Categoria.find({
      tipo: new RegExp(`^${escaparExpresionRegular(tipoNormalizado)}$`, "i"),
    })
      .select("_id")
      .lean();

    if (categorias.length === 0) {
      return { data: [], total: 0, page: pageNum, limit: limitNum, totalPages: 0 };
    }

    const categoriaIds = categorias.map((categoria) => categoria._id);
    const filter = { categoriaId: { $in: categoriaIds } };
    const total = await Ecosistema.countDocuments(filter);
    const docs = await poblarCategoria(Ecosistema.find(filter).skip(skip).limit(limitNum));
    const totalPages = Math.ceil(total / limitNum);
    return { data: docs, total, page: pageNum, limit: limitNum, totalPages };
  }

  const total = await Ecosistema.countDocuments();
  const docs = await poblarCategoria(Ecosistema.find().skip(skip).limit(limitNum));
  const totalPages = Math.ceil(total / limitNum);
  return { data: docs, total, page: pageNum, limit: limitNum, totalPages };
};

export const buscarEcosistemasPorCategoriaService = async (categoriaId, { page = 1, limit = 10 } = {}) => {
  await validarCategoriaExistente(categoriaId);
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
  const skip = (pageNum - 1) * limitNum;

  const filter = { categoriaId };
  const total = await Ecosistema.countDocuments(filter);
  const docs = await poblarCategoria(Ecosistema.find(filter).skip(skip).limit(limitNum));
  const totalPages = Math.ceil(total / limitNum);
  return { data: docs, total, page: pageNum, limit: limitNum, totalPages };
};

export const crearEcosistemaService = async (ecosistemaGuardar) => {
  // Validar usuario
  if (!ecosistemaGuardar.usuarioId || !isValidObjectId(ecosistemaGuardar.usuarioId)) {
    throw crearErrorHttp("ID de usuario inválido", 400);
  }

  const usuario = await Usuario.findById(ecosistemaGuardar.usuarioId).select("plan").lean();
  if (!usuario) {
    throw crearErrorHttp("Usuario no encontrado", 404);
  }

  // Si no es premium, aplicar límite de 4 ecosistemas
  if (usuario.plan !== "premium") {
    const count = await Ecosistema.countDocuments({ usuarioId: ecosistemaGuardar.usuarioId });
    if (count >= 4) {
      throw crearErrorHttp("Límite de ecosistemas alcanzado para usuarios estándar", 403);
    }
  }

  await validarCategoriaExistente(ecosistemaGuardar.categoriaId);

  const ecosistema = new Ecosistema(ecosistemaGuardar);
  await ecosistema.save();
  return poblarCategoria(Ecosistema.findById(ecosistema._id));
};

export const actualizarEcosistemaService = async (id, ecosistemaActualizar) => {
  if (!isValidObjectId(id)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }

  if (ecosistemaActualizar.categoriaId !== undefined) {
    await validarCategoriaExistente(ecosistemaActualizar.categoriaId);
  }
  return poblarCategoria(
    Ecosistema.findByIdAndUpdate(id, ecosistemaActualizar, {
      new: true,
      runValidators: true,
    }),
  );
};

export const eliminarEcosistemaService = async (id) => {
  if (!isValidObjectId(id)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }
  return Ecosistema.findByIdAndDelete(id);
};
