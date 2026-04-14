import Registro from "../models/registro.model.js";

export const obtenerRegistrosPorEcosistemaService = async (ecosistemaId) => {
  return await Registro.find({ ecosistemaId });
};

export const obtenerRegistroPorIdService = async (id) => {
  return await Registro.findById(id);
};

export const crearRegistroService = async (registroGuardar) => {
  const registro = new Registro(registroGuardar);
  await registro.save();
  return registro;
};

export const eliminarRegistroService = async (id) => {
  return await Registro.findByIdAndDelete(id);
};

export default {
  obtenerRegistrosPorEcosistemaService,
  obtenerRegistroPorIdService,
  crearRegistroService,
  eliminarRegistroService,
};
