import express from "express";
import { agregarUsuario, buscarUsuario } from "../controllers/usuarios.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearUsuarioSchema } from "../validators/usuarios.validators.js";

const router = express.Router();

router.get("/:nombre", buscarUsuario);
router.post("/", validateBodyMiddleware(crearUsuarioSchema), agregarUsuario );

export default router;
