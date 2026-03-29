import { crearUsuarioSchema, buscarUsuarioSchema } from "../validators/usuarios.validators.js";

let usuarios = [];
let nextId = 1;

export const agregarUsuario = (req, res) => {
  const body = req.validatedBody || req.body;
  const usuario = {
    id: nextId++,
    nombreUsuario: body.nombreUsuario,
    email: body.email,
    contraseña: body.contraseña,
    rol: body.rol || "usuario",
    plan: body.plan || "plus",
    creadoEn: new Date(),
    actualizadoEn: new Date(),
  };
  usuarios.push(usuario);
  res.status(201).json({ mensaje: "Usuario creado", usuario });
};

export const buscarUsuario = (req, res) => {
  const nombre = req.params.nombre;
  const { error, value } = buscarUsuarioSchema.validate(nombre, { abortEarly: false });
  if (error) {
    return res.status(400).json({ mensaje: "Error en validación", error: error.details });
  }
  const resultado = usuarios.filter(u => u.nombreUsuario.toLowerCase() === value.toLowerCase());
  res.json({ resultado });
};
