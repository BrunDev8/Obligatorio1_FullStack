import { obtenerRegistroParametrosPorEcosistemaService, crearRegistroParametroService } from "../services/registroParametro.services.js";

export const obtenerRegistroParametrosPorEcosistema = async (req, res, next) => { try { return res.json({ data: await obtenerRegistroParametrosPorEcosistemaService(req.params.ecosistemaId) }); } catch (error) { next(error); } };
export const agregarRegistroParametro = async (req, res, next) => { try { const body = req.validatedBody || req.body; const salinidad = body.salinidad ?? body.humedad; const data = await crearRegistroParametroService({ ...body, salinidad, humedad: body.humedad }); return res.status(201).json({ data }); } catch (error) { next(error); } };
export const obtenerRegistrosPorEcosistema = obtenerRegistroParametrosPorEcosistema;
export const agregarRegistro = agregarRegistroParametro;
