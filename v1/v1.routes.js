import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import authRouter from "./routes/auth.routes.js";
import ecosistemasRouter from "./routes/ecosistemas.routes.js";
import registrosRouter from "./routes/registros.routes.js";
import tareasRouter from "./routes/tareas.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";



const router = express.Router({ mergeParams: true });

// Rutas v1 

//rutas de login y registro de usuarios, sin necesidad de token
router.use("/auth", authRouter);

//middleware para verificar de token
router.use(authenticateMiddleware);

router.use("/usuarios", usuariosRouter);
router.use("/ecosistemas", ecosistemasRouter);
router.use("/registros", registrosRouter);
router.use("/tareas", tareasRouter);
router.use("/categorias", categoriasRouter);

export default router;