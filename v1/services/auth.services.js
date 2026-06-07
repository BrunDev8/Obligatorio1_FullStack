import Usuario from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registrarUsuarioService = async (usuario) => {
  const nuevoUsuario = new Usuario(usuario);
  await nuevoUsuario.save();
  const token = jwt.sign(
    { id: nuevoUsuario._id, plan: nuevoUsuario.plan },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
  return { token };
};

export const loginService = async (email, password) => {
  const usuario = await Usuario.findOne({ email }).select(
    "_id username email plan password",
  );

  if (!usuario) return { message: "Usuario no encontrado" };
  const isMatch = bcrypt.compareSync(password, usuario.password);
  if (!isMatch) return { message: "Contraseña incorrecta" };
  const token = jwt.sign(
    { id: usuario._id, plan: usuario.plan },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
  return {
    token,
    usuario: {
      _id: usuario._id,
      username: usuario.username,
      email: usuario.email,
      plan: usuario.plan,
    },
  };
};
