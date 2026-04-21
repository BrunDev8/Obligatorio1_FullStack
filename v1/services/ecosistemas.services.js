import Ecosistema from "../models/ecosistema.model.js";
import Categoria from "../models/categoria.model.js";
import { isValidObjectId } from "mongoose";

const crearErrorHttp = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
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

export const obtenerEcosistemasService = async ({ categoriaTipo } = {}) => {
  const tipoNormalizado =
    typeof categoriaTipo === "string" ? categoriaTipo.trim() : "";

  if (tipoNormalizado) {
    const categorias = await Categoria.find({
      tipo: new RegExp(`^${escaparExpresionRegular(tipoNormalizado)}$`, "i"),
    })
      .select("_id")
      .lean();

    if (categorias.length === 0) {
      return [];
    }

    const categoriaIds = categorias.map((categoria) => categoria._id);
    return poblarCategoria(
      Ecosistema.find({ categoriaId: { $in: categoriaIds } }),
    );
  }

  return poblarCategoria(Ecosistema.find());
};

export const obtenerEcosistemaPorIdService = async (id) => {
  if (!isValidObjectId(id)) {
    throw crearErrorHttp("ID de ecosistema inválido", 400);
  }
  return poblarCategoria(Ecosistema.findById(id));
};

export const crearEcosistemaService = async (ecosistemaGuardar) => {
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
