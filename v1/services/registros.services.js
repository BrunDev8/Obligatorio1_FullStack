import Registro from "../models/registro.model.js";


export const obtenerRegistrosPorEcosistemaService = async (ecosistemaId) => {
  if (!isValidObjectId(ecosistemaId)) {
    throw new Error("ID de ecosistema inválido");
  }
  return await Registro.find({ ecosistemaId });
};

export const obtenerRegistroPorIdService = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  } 
  return await Registro.findById(id);
};

export const crearRegistroService = async (registroGuardar) => {
  if (!isValidObjectId(registroGuardar.ecosistemaId)) {
    throw new Error("ID de ecosistema inválido");
  }
  if (!isValidObjectId(registroGuardar.usuarioId)) {
    throw new Error("ID de usuario inválido");
  }

  const registro = new Registro(registroGuardar);
  await registro.save();
  return registro;
};

export const eliminarRegistroService = async (id) => {
  if (!isValidObjectId(id)) {
    throw new Error("ID inválido");
  }
  return await Registro.findByIdAndDelete(id);
};

export default {
  obtenerRegistrosPorEcosistemaService,
  obtenerRegistroPorIdService,
  crearRegistroService,
  eliminarRegistroService,
};
