import {
  obtenerCategoriasService,
  crearCategoriaService,
  actualizarCategoriaService,
  eliminarCategoriaService,
} from "../services/categorias.services.js";

export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await obtenerCategoriasService();
    res.json({ success: true, message: "Categorias obtenidas", data: categorias });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al obtener categorias", error: err.message });
  }
};

export const agregarCategoria = async (req, res) => {
  try {
    const body = req.validatedBody || req.body;
    const categoriaGuardar = {
      nombre: body.nombre,
      tipo: body.tipo,
      descripcion: body.descripcion || "",
    };
    const categoria = await crearCategoriaService(categoriaGuardar);
    res.status(201).json({ success: true, message: "Categoria creada", data: categoria });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al crear categoria", error: err.message });
  }
};

export const editarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.validatedBody || req.body;
    const categoria = await actualizarCategoriaService(id, {
      nombre: body.nombre,
      tipo: body.tipo,
      descripcion: body.descripcion,
    });
    if (!categoria) return res.status(404).json({ success: false, message: "Categoria no encontrada" });
    res.json({ success: true, message: "Categoria actualizada", data: categoria });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al actualizar categoria", error: err.message });
  }
};

export const eliminarCategoria = async (req, res) => {
  try {
    const id = req.params.id;
    const categoria = await eliminarCategoriaService(id);
    if (!categoria) return res.status(404).json({ success: false, message: "Categoria no encontrada" });
    res.json({ success: true, message: "Categoria eliminada", data: categoria });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al eliminar categoria", error: err.message });
  }
};

export default { obtenerCategorias, agregarCategoria, editarCategoria, eliminarCategoria };
