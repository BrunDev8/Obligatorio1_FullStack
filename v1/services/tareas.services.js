import { isValidObjectId } from "mongoose";
import Tarea from "../models/tarea.model.js";
import Ecosistema from "../models/ecosistema.model.js";

const errorHttp = (message, statusCode) => Object.assign(new Error(message), { statusCode });
const comprobarEcosistema = async (id) => {
  if (!isValidObjectId(id)) throw errorHttp("ID de ecosistema inválido", 400);
  if (!await Ecosistema.exists({ _id: id })) throw errorHttp("Ecosistema no encontrado", 404);
};
export const obtenerTareasPorEcosistemaService = async (ecosistemaId) => {
  await comprobarEcosistema(ecosistemaId);
  return Tarea.find({ ecosistemaId }).sort({ createdAt: -1 });
};
export const crearTareaService = async (datos) => {
  await comprobarEcosistema(datos.ecosistemaId);
  return Tarea.create(datos);
};
