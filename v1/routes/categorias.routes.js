import express from "express";
import { obtenerCategorias, agregarCategoria } from "../controllers/categorias.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearCategoriaSchema } from "../validators/categorias.validators.js";

const router = express.Router();

router.get("/", obtenerCategorias);
router.post("/", validateBodyMiddleware(crearCategoriaSchema), agregarCategoria);

export default router;
