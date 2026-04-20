import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import authRouter from "./routes/auth.routes.js";
import ecosistemasRouter from "./routes/ecosistemas.routes.js";
import registroParametroRouter from "./routes/registroParametro.routes.js";
import tareasRouter from "./routes/tareas.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";

const router = express.Router();

// Públicas
router.use("/auth", authRouter);

// Privadas
router.use("/usuarios", authenticateMiddleware, usuariosRouter);
router.use("/ecosistemas", authenticateMiddleware, ecosistemasRouter);
router.use("/registro-parametros", authenticateMiddleware, registroParametroRouter);
router.use("/tareas", authenticateMiddleware, tareasRouter);
router.use("/categorias", authenticateMiddleware, categoriasRouter);

export default router;