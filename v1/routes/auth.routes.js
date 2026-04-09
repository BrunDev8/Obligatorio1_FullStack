import express from "express";
import { ingresarUsuario, registrarUsuario } from "../controllers/auth.controller.js";
import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validators.js";

const router = express.Router({ mergeParams: true });

router.post("/login", validateBodyMiddleware(loginSchema), ingresarUsuario);
router.post("/register", validateBodyMiddleware(registerSchema), registrarUsuario);

export default router;