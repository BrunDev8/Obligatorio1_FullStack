import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import authRouter from "./routes/auth.routes.js";
import ecosistemasRouter from "./routes/ecosistemas.routes.js";
import registrosRouter from "./routes/registros.routes.js";
import tareasRouter from "./routes/tareas.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";



const router = express.Router();

// Rutas v1 
//rutas de login y registro de usuarios, sin necesidad de token
router.use("/auth", authRouter);

//rutas protegidas, requieren token
router.use("/usuarios", authenticateMiddleware, usuariosRouter);
router.use("/ecosistemas", authenticateMiddleware, ecosistemasRouter);
router.use("/registros", authenticateMiddleware, registrosRouter);
router.use("/tareas", authenticateMiddleware, tareasRouter);
router.use("/categorias", authenticateMiddleware, categoriasRouter);

export default router;