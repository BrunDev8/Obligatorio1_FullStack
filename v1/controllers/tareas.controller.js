let tareas = [];
let nextTareaId = 1;

export const obtenerTareasPorEcosistema = (req, res) => {
  const ecosistemaId = Number(req.params.ecosistemaId);
  const resultado = tareas.filter(t => t.ecosistemaId === ecosistemaId);
  res.json({ tareas: resultado });
};

export const agregarTarea = (req, res) => {
  const body = req.validatedBody || req.body;
  const tarea = {
    id: nextTareaId++,
    ecosistemaId: Number(body.ecosistemaId),
    titulo: body.titulo,
    descripcion: body.descripcion || "",
    tipo: body.tipo,
    frecuencia: body.frecuencia,
    ultimaEjecucion: body.ultimaEjecucion ? new Date(body.ultimaEjecucion) : null,
    proximaEjecucion: body.proximaEjecucion ? new Date(body.proximaEjecucion) : null,
    completada: !!body.completada,
  };
  tareas.push(tarea);
  res.status(201).json({ mensaje: "Tarea creada", tarea });
};

export const actualizarTarea = (req, res) => {
  const id = Number(req.params.id);
  const tarea = tareas.find(t => t.id === id);
  if (!tarea) return res.status(404).json({ mensaje: "Tarea no encontrada" });
  const body = req.validatedBody || req.body;
  Object.assign(tarea, body);
  res.json({ mensaje: "Tarea actualizada", tarea });
};

export default { obtenerTareasPorEcosistema };
