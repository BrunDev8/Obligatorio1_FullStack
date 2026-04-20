import express from "express";
import { agregarUsuario, buscarUsuario, cambiarPlan } from "../controllers/usuarios.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { crearUsuarioSchema, cambiarPlanSchema } from "../validators/usuarios.validators.js";

const router = express.Router();

// Create user
router.post("/", validateBodyMiddleware(crearUsuarioSchema), agregarUsuario );

// Plan change endpoint 
router.patch("/plan", validateBodyMiddleware(cambiarPlanSchema), cambiarPlan);

// Search user by username 
router.get("/:username", buscarUsuario);

export default router;
