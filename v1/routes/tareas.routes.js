import express from "express";
import { obtenerTareasPorEcosistema, agregarTarea } from "../controllers/tareas.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearTareaSchema } from "../validators/tareas.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/ecosistema/:ecosistemaId", obtenerTareasPorEcosistema);
router.post("/", validateBodyMiddleware(crearTareaSchema), agregarTarea);

export default router;
