import express from "express";
import { obtenerTareasPorEcosistema, agregarTarea, actualizarTarea } from "../controllers/tareas.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearTareaSchema, actualizarTareaSchema } from "../validators/tareas.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/ecosistema/:ecosistemaId", obtenerTareasPorEcosistema);
router.post("/", validateBodyMiddleware(crearTareaSchema), agregarTarea);
router.put("/:id", validateBodyMiddleware(actualizarTareaSchema), actualizarTarea);

export default router;
