import Usuario from "../models/usuario.model.js";

export const obtenerUsuariosService = async () => {
  return await Usuario.find();
};

export const obtenerUsuarioPorIdService = async (id) => { 
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }

  return await Usuario.findById(id);
};

export const obtenerUsuarioPorNombreService = async (username) => {
  return await Usuario.findOne({ username: username.toLowerCase() });
};

export const crearUsuarioService = async (usuarioGuardar) => {
  const usuario = new Usuario(usuarioGuardar);
  await usuario.save();
  return usuario;
};

export const actualizarUsuarioService = async (id, usuarioActualizar) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Usuario.findByIdAndUpdate(id, usuarioActualizar, { new: true });
};

export const eliminarUsuarioService = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Usuario.findByIdAndDelete(id);
};

export default {
  obtenerUsuariosService,
  obtenerUsuarioPorIdService,
  obtenerUsuarioPorNombreService,
  crearUsuarioService,
  actualizarUsuarioService,
  eliminarUsuarioService,
};
