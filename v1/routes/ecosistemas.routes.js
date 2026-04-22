import express from "express";
import { obtenerEcosistemas, buscarEcosistemasPorCategoria, agregarEcosistema, actualizarEcosistema, eliminarEcosistema } from "../controllers/ecosistemas.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearEcosistemaSchema, actualizarEcosistemaSchema } from "../validators/ecosistemas.validators.js";

const router = express.Router({ mergeParams: true });

router.get("/", obtenerEcosistemas);
router.get("/categoria/:categoriaId", buscarEcosistemasPorCategoria);
router.post("/", validateBodyMiddleware(crearEcosistemaSchema), agregarEcosistema);
router.put("/:id", validateBodyMiddleware(actualizarEcosistemaSchema), actualizarEcosistema);
router.delete("/:id", eliminarEcosistema);

export default router;
