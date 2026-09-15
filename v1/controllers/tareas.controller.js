import { obtenerTareasPorEcosistemaService, crearTareaService } from "../services/tareas.services.js";

export const obtenerTareasPorEcosistema = async (req, res, next) => { try { return res.json({ data: await obtenerTareasPorEcosistemaService(req.params.ecosistemaId) }); } catch (error) { next(error); } };
export const agregarTarea = async (req, res, next) => { try { const data = await crearTareaService(req.validatedBody || req.body); return res.status(201).json({ data }); } catch (error) { next(error); } };
