import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Usuario from "../models/usuario.model.js";

const ROUNDS = 12; //cantidad de rondas para el hash de la contraseña

export const loginService = async (email, password) => {
  const usuario = await Usuario.findOne({
    email: email.toLowerCase(),
  });
  if (!usuario) return { success: false, message: "Credenciales inválidas" };
  const valid = await bcrypt.compare(password, usuario.password);
  if (!valid) return { success: false, message: "Credenciales inválidas" };
  const token = jwt.sign(
    { id: usuario._id, username: usuario.username, email: usuario.email },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );
  return { success: true, token, usuario };
};

export const registrarUsuarioService = async (username, email, password) => {
  const usuarioExistente = await Usuario.findOne({
    $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
  });
  if (usuarioExistente)
    return { success: false, message: "El nombre de usuario o email ya existe" };
  const passwordHash = await bcrypt.hash(password, ROUNDS);
  const usuario = await Usuario.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    password: passwordHash,
  });
  const token = jwt.sign(
    { id: usuario._id, username: usuario.username, email: usuario.email },
    process.env.SECRET_KEY,
    { expiresIn: "1d" },
  );
  return { success: true, token, usuario };
};

export default { loginService, registrarUsuarioService };
