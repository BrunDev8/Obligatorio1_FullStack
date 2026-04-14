import Ecosistema from "../models/ecosistema.model.js";

export const obtenerEcosistemasService = async () => {
  return await Ecosistema.find();
};

export const obtenerEcosistemaPorIdService = async (id) => {
  return await Ecosistema.findById(id);
};

export const crearEcosistemaService = async (ecosistemaGuardar) => {
  const ecosistema = new Ecosistema(ecosistemaGuardar);
  await ecosistema.save();
  return ecosistema;
};

export const actualizarEcosistemaService = async (id, ecosistemaActualizar) => {
  return await Ecosistema.findByIdAndUpdate(id, ecosistemaActualizar, { new: true });
};

export const eliminarEcosistemaService = async (id) => {
  return await Ecosistema.findByIdAndDelete(id);
};

export default {
  obtenerEcosistemasService,
  obtenerEcosistemaPorIdService,
  crearEcosistemaService,
  actualizarEcosistemaService,
  eliminarEcosistemaService,
};
