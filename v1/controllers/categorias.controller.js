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

export default { obtenerCategorias };
