import express from "express";
import { obtenerRegistrosPorEcosistema, agregarRegistro } from "../controllers/registros.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearRegistroSchema } from "../validators/registros.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/ecosistema/:ecosistemaId", obtenerRegistrosPorEcosistema);
router.post("/", validateBodyMiddleware(crearRegistroSchema), agregarRegistro);

export default router;
