import express from "express";
import { obtenerCategorias, agregarCategoria, editarCategoria, eliminarCategoria } from "../controllers/categorias.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearCategoriaSchema, actualizarCategoriaSchema } from "../validators/categorias.validators.js";

const router = express.Router();

router.get("/", obtenerCategorias);
router.post("/", validateBodyMiddleware(crearCategoriaSchema), agregarCategoria);
router.put("/:id", validateBodyMiddleware(actualizarCategoriaSchema), editarCategoria);
router.delete("/:id", eliminarCategoria);

export default router;
