let ecosistemas = [];
let nextEcosistemaId = 1;

export const obtenerEcosistemas = (req, res) => {
  res.json({ ecosistemas });
};

export const obtenerEcosistema = (req, res) => {
  const id = Number(req.params.id);
  const eco = ecosistemas.find(e => e.id === id);
  if (!eco) return res.status(404).json({ mensaje: "Ecosistema no encontrado" });
  res.json({ ecosistema: eco });
};

export const agregarEcosistema = (req, res) => {
  const body = req.validatedBody || req.body;
  const ecosistema = {
    id: nextEcosistemaId++,
    nombre: body.nombre,
    tipo: body.tipo,
    descripcion: body.descripcion || "",
    tamaño: body.tamaño || 0,
    usuarioId: body.usuarioId || null,
    categoriaId: body.categoriaId || null,
    imagenUrl: body.imagenUrl || null,
    creadoEn: new Date(),
    actualizadoEn: new Date(),
  };
  ecosistemas.push(ecosistema);
  res.status(201).json({ mensaje: "Ecosistema creado", ecosistema });
};

export const actualizarEcosistema = (req, res) => {
  const id = Number(req.params.id);
  const eco = ecosistemas.find(e => e.id === id);
  if (!eco) return res.status(404).json({ mensaje: "Ecosistema no encontrado" });
  const body = req.validatedBody || req.body;
  Object.assign(eco, body, { actualizadoEn: new Date() });
  res.json({ mensaje: "Ecosistema actualizado", ecosistema: eco });
};

export const eliminarEcosistema = (req, res) => {
  const id = Number(req.params.id);
  const idx = ecosistemas.findIndex(e => e.id === id);
  if (idx === -1) return res.status(404).json({ mensaje: "Ecosistema no encontrado" });
  const eliminado = ecosistemas.splice(idx, 1)[0];
  res.json({ mensaje: "Ecosistema eliminado", ecosistema: eliminado });
};

export default { obtenerEcosistemas };
