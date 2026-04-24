import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import authRouter from "./routes/auth.routes.js";
import ecosistemasRouter from "./routes/ecosistemas.routes.js";
import registroParametroRouter from "./routes/registroParametro.routes.js";
import tareasRouter from "./routes/tareas.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import { authenticateMiddleware } from "./middlewares/authenticate.middleware.js";
import aiRouter from "./routes/ai.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";
import plantsRouter from "./routes/plants.routes.js";

const router = express.Router();

// Públicas
router.use("/auth", authRouter);

// Privadas
router.use("/usuarios", authenticateMiddleware, usuariosRouter);
router.use("/ecosistemas", authenticateMiddleware, ecosistemasRouter);
router.use("/registro-parametros", authenticateMiddleware, registroParametroRouter);
router.use("/tareas", authenticateMiddleware, tareasRouter);
router.use("/categorias", authenticateMiddleware, categoriasRouter);
router.use("/ai", aiRouter);
router.use("/plants", plantsRouter);
router.use("/uploads", uploadsRouter);

export default router;