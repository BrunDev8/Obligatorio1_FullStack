import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import authRouter from "./routes/auth.routes.js";
import ecosistemasRouter from "./routes/ecosistemas.routes.js";
import registroParametroRouter from "./routes/registroParametro.routes.js";
import tareasRouter from "./routes/tareas.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";
import aiRouter from "./routes/ai.routes.js";
import uploadsRouter from "./routes/uploads.routes.js";
import plantsRouter from "./routes/plants.routes.js";

const router = express.Router();

// Públicas
router.use("/auth", authRouter);

router.use("/usuarios", usuariosRouter);
router.use("/ecosistemas", ecosistemasRouter);
router.use("/registro-parametros", registroParametroRouter);
router.use("/tareas", tareasRouter);
router.use("/categorias", categoriasRouter);
router.use("/ai", aiRouter);
router.use("/plants", plantsRouter);
router.use("/uploads", uploadsRouter);

export default router;