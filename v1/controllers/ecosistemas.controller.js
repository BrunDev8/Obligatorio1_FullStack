import {
  obtenerEcosistemasService,
  buscarEcosistemasPorCategoriaService,
  crearEcosistemaService,
  actualizarEcosistemaService,
  eliminarEcosistemaService,
} from "../services/ecosistemas.services.js";
import { generateEcosystemTip } from "./ai.controllers.js";

export const obtenerEcosistemas = async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const result = await obtenerEcosistemasService({
      categoriaTipo: req.query.categoriaTipo,
      page,
      limit,
    });

    const { data, total, page: pageNum, limit: limitNum, totalPages } = result;

    if (Array.isArray(data) && data.length === 0) {
      const mensaje = req.query.categoriaTipo
        ? "No se encontraron ecosistemas para la categoría especificada"
        : "No se encontraron ecosistemas";
      return res.json({ success: true, message: mensaje, data, pagination: { total, page: pageNum, limit: limitNum, totalPages } });
    }

    res.json({ success: true, message: "Ecosistemas obtenidos", data, pagination: { total, page: pageNum, limit: limitNum, totalPages } });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: "Error al obtener ecosistemas",
        error: err.message,
      });
  }
};

export const buscarEcosistemasPorCategoria = async (req, res) => {
  try {
    const categoriaId = req.params.categoriaId;
    const page = req.query.page;
    const limit = req.query.limit;
    const result = await buscarEcosistemasPorCategoriaService(categoriaId, { page, limit });
    const { data, total, page: pageNum, limit: limitNum, totalPages } = result;

    if (Array.isArray(data) && data.length === 0) {
      return res.json({ success: true, message: "No se encontraron ecosistemas para la categoría", data, pagination: { total, page: pageNum, limit: limitNum, totalPages } });
    }

    res.json({ success: true, message: "Ecosistemas por categoría obtenidos", data, pagination: { total, page: pageNum, limit: limitNum, totalPages } });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: "Error al obtener ecosistemas por categoría",
        error: err.message,
      });
  }
};

export const agregarEcosistema = async (req, res) => {
  try {
    const body = req.validatedBody || req.body;
    const ecosistemaGuardar = {
      nombre: body.nombre,
      descripcion: body.descripcion || "",
      tamano: body.tamano,
      usuarioId: body.usuarioId || req.decoded.id,
      categoriaId: body.categoriaId,
      imagenUrl: body.imagenUrl || null,
    };
    const ecosistema = await crearEcosistemaService(ecosistemaGuardar);
    // Attempt to generate a short AI tip for this ecosystem name. If it fails, still return success.
    let aiTip = null;
    try {
      aiTip = await generateEcosystemTip(ecosistema.nombre || ecosistemaGuardar.nombre);
    } catch (err) {
      // log and continue
      console.error('AI tip generation failed:', err?.toString());
    }

    res
      .status(201)
      .json({ success: true, message: "Ecosistema creado", data: ecosistema, aiTip });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: "Error al crear ecosistema",
        error: err.message,
      });
  }
};

export const actualizarEcosistema = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.validatedBody || req.body;
    const eco = await actualizarEcosistemaService(id, { ...body });
    if (!eco)
      return res
        .status(404)
        .json({ success: false, message: "Ecosistema no encontrado" });
    res.json({ success: true, message: "Ecosistema actualizado", data: eco });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: "Error al actualizar ecosistema",
        error: err.message,
      });
  }
};

export const eliminarEcosistema = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await eliminarEcosistemaService(id);
    if (!eliminado)
      return res
        .status(404)
        .json({ success: false, message: "Ecosistema no encontrado" });
    res.json({
      success: true,
      message: "Ecosistema eliminado",
      data: eliminado,
    });
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({
        success: false,
        message: "Error al eliminar ecosistema",
        error: err.message,
      });
  }
};
