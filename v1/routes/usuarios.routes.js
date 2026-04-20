import express from "express";
import { buscarUsuario, cambiarPlan } from "../controllers/usuarios.controller.js";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { cambiarPlanSchema } from "../validators/usuarios.validators.js";

const router = express.Router();

router.patch("/plan", validateBodyMiddleware(cambiarPlanSchema), cambiarPlan);
router.get("/:username", buscarUsuario);

export default router;
