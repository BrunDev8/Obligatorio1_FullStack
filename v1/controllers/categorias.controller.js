let categorias = [];
let nextCategoriaId = 1;

export const obtenerCategorias = (req, res) => {
  res.json({ categorias });
};

export const agregarCategoria = (req, res) => {
  const body = req.validatedBody || req.body;
  const categoria = {
    id: nextCategoriaId++,
    nombre: body.nombre,
    tipo: body.tipo,
    descripcion: body.descripcion || "",
  };
  categorias.push(categoria);
  res.status(201).json({ mensaje: "Categoria creada", categoria });
};

export const editarCategoria = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ mensaje: "ID inválido" });
  }

  const body = req.validatedBody || req.body;
  const index = categorias.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Categoria no encontrada" });
  }

  const categoria = categorias[index];
  const updated = {
    ...categoria,
    nombre: body.nombre !== undefined ? body.nombre : categoria.nombre,
    tipo: body.tipo !== undefined ? body.tipo : categoria.tipo,
    descripcion: body.descripcion !== undefined ? body.descripcion : categoria.descripcion,
  };

  categorias[index] = updated;
  res.json({ mensaje: "Categoria actualizada", categoria: updated });
};

export const eliminarCategoria = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ mensaje: "ID inválido" });
  }

  const index = categorias.findIndex((c) => c.id === id);
  if (index === -1) {
    return res.status(404).json({ mensaje: "Categoria no encontrada" });
  }

  categorias.splice(index, 1);
  res.json({ mensaje: "Categoria eliminada" });
};

export default { obtenerCategorias, agregarCategoria, editarCategoria, eliminarCategoria };
