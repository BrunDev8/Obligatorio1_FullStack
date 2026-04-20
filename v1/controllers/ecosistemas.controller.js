import {
  obtenerEcosistemasService,
  obtenerEcosistemaPorIdService,
  crearEcosistemaService,
  actualizarEcosistemaService,
  eliminarEcosistemaService,
} from "../services/ecosistemas.services.js";

export const obtenerEcosistemas = async (req, res) => {
  try {
    const ecosistemas = await obtenerEcosistemasService();
    res.json({ success: true, message: "Ecosistemas obtenidos", data: ecosistemas });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al obtener ecosistemas", error: err.message });
  }
};

export const obtenerEcosistema = async (req, res) => {
  try {
    const id = req.params.id;
    const eco = await obtenerEcosistemaPorIdService(id);
    if (!eco) return res.status(404).json({ success: false, message: "Ecosistema no encontrado" });
    res.json({ success: true, message: "Ecosistema obtenido", data: eco });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al obtener ecosistema", error: err.message });
  }
};

export const agregarEcosistema = async (req, res) => {
  try {
    const body = req.validatedBody || req.body;
    if (body.tamaño !== undefined && body.tamano === undefined) body.tamano = body.tamaño;
    const ecosistemaGuardar = {
      nombre: body.nombre,
      tipo: body.tipo,
      descripcion: body.descripcion || "",
      tamano: body.tamano || 0,
      usuarioId: body.usuarioId || req.decoded.id,
      categoriaId: body.categoriaId || null,
      imagenUrl: body.imagenUrl || null,
    };
    const ecosistema = await crearEcosistemaService(ecosistemaGuardar);
    res.status(201).json({ success: true, message: "Ecosistema creado", data: ecosistema });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al crear ecosistema", error: err.message });
  }
};

export const actualizarEcosistema = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.validatedBody || req.body;
    if (body.tamaño !== undefined && body.tamano === undefined) body.tamano = body.tamaño;
    const eco = await actualizarEcosistemaService(id, { ...body });
    if (!eco) return res.status(404).json({ success: false, message: "Ecosistema no encontrado" });
    res.json({ success: true, message: "Ecosistema actualizado", data: eco });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al actualizar ecosistema", error: err.message });
  }
};

export const eliminarEcosistema = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminado = await eliminarEcosistemaService(id);
    if (!eliminado) return res.status(404).json({ success: false, message: "Ecosistema no encontrado" });
    res.json({ success: true, message: "Ecosistema eliminado", data: eliminado });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al eliminar ecosistema", error: err.message });
  }
};

export default { obtenerEcosistemas, obtenerEcosistema, agregarEcosistema, actualizarEcosistema, eliminarEcosistema };
