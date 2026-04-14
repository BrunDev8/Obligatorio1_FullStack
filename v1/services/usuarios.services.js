import Usuario from "../models/usuario.model.js";

export const obtenerUsuariosService = async () => {
  return await Usuario.find();
};

export const obtenerUsuarioPorIdService = async (id) => {
  return await Usuario.findById(id);
};

export const obtenerUsuarioPorNombreService = async (nombreUsuario) => {
  return await Usuario.findOne({ nombreUsuario: nombreUsuario.toLowerCase() });
};

export const crearUsuarioService = async (usuarioGuardar) => {
  const usuario = new Usuario(usuarioGuardar);
  await usuario.save();
  return usuario;
};

export const actualizarUsuarioService = async (id, usuarioActualizar) => {
  return await Usuario.findByIdAndUpdate(id, usuarioActualizar, { new: true });
};

export const eliminarUsuarioService = async (id) => {
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
