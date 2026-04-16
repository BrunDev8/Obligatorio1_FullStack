import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

const ROUNDS = 12; //cantidad de rondas para el hash de la contraseña

export const loginService = async (username, password) => {
  const usuario = await Usuario.findOne({
    nombreUsuario: username.toLowerCase(),
  });
  if (!usuario) return { success: false, message: "Credenciales inválidas" };
  const valid = await bcrypt.compare(password, usuario.contraseña);
  if (!valid) return { success: false, message: "Credenciales inválidas" };
  const token = jwt.sign(
    { id: usuario._id, nombreUsuario: usuario.nombreUsuario },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );
  return { success: true, token, usuario };
};

export const registrarUsuarioService = async (username, password) => {
  const usuarioExistente = await Usuario.findOne({
    nombreUsuario: username.toLowerCase(),
  });
  if (usuarioExistente)
    return { success: false, message: "El nombre de usuario ya existe" };
  const passwordHash = await bcrypt.hash(password, ROUNDS);
  const usuario = await Usuario.create({
    nombreUsuario: username.toLowerCase(),
    contraseña: passwordHash,
  });
  const token = jwt.sign(
    { id: usuario._id, nombreUsuario: usuario.nombreUsuario },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );
  return { success: true, token, usuario };
};

export default { loginService, registrarUsuarioService };
