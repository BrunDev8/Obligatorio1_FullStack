import bcrypt from "bcryptjs";
import { crearUsuarioService, obtenerUsuarioPorNombreService } from "../services/usuarios.services.js";
import { crearUsuarioSchema, buscarUsuarioSchema } from "../validators/usuarios.validators.js";

const SALT_ROUNDS = 12;

export const agregarUsuario = async (req, res) => {
  try {
    const body = req.validatedBody || req.body;
    const hash = await bcrypt.hash(body.contraseña, SALT_ROUNDS);
    const usuarioGuardar = {
      nombreUsuario: body.nombreUsuario,
      email: body.email,
      contraseña: hash,
      rol: body.rol || "usuario",
      plan: body.plan || "estandar",
    };
    const usuario = await crearUsuarioService(usuarioGuardar);
    res.status(201).json({ success: true, message: "Usuario creado", data: usuario });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al crear usuario", error: err.message });
  }
};

export const buscarUsuario = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    const { error, value } = buscarUsuarioSchema.validate(nombre, { abortEarly: false });
    if (error) return res.status(400).json({ success: false, message: "Error en validación", error: error.details });
    const resultado = await obtenerUsuarioPorNombreService(value);
    res.json({ success: true, message: "Usuario(s) encontrado(s)", data: resultado });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al buscar usuario", error: err.message });
  }
};
