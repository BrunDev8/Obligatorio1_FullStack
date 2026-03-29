let registros = [];
let nextRegistroId = 1;

export const obtenerRegistrosPorEcosistema = (req, res) => {
  const ecosistemaId = Number(req.params.ecosistemaId);
  const resultado = registros.filter(r => r.ecosistemaId === ecosistemaId);
  res.json({ registros: resultado });
};

export const agregarRegistro = (req, res) => {
  const body = req.validatedBody || req.body;
  const registro = {
    id: nextRegistroId++,
    ecosistemaId: Number(body.ecosistemaId),
    temperatura: body.temperatura,
    ph: body.ph,
    humedad: body.humedad,
    nitratos: body.nitratos,
    notas: body.notas || "",
    fechaRegistro: body.fechaRegistro ? new Date(body.fechaRegistro) : new Date(),
  };
  registros.push(registro);
  res.status(201).json({ mensaje: "Registro creado", registro });
};

export default { obtenerRegistrosPorEcosistema };
