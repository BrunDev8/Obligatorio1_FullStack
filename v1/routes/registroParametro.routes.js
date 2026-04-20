import express from "express";
import {
  obtenerRegistroParametrosPorEcosistema,
  agregarRegistroParametro,
} from "../controllers/registroParametro.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearRegistroParametroSchema } from "../validators/registroParametro.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/ecosistema/:ecosistemaId", obtenerRegistroParametrosPorEcosistema);
router.post("/", validateBodyMiddleware(crearRegistroParametroSchema), agregarRegistroParametro);

export default router;
