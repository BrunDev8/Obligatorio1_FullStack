import express from "express";
import usuariosRouter from "./routes/usuarios.routes.js";
import ecosistemasRouter from "./routes/ecosistemas.routes.js";
import registrosRouter from "./routes/registros.routes.js";
import tareasRouter from "./routes/tareas.routes.js";
import categoriasRouter from "./routes/categorias.routes.js";

const router = express.Router({ mergeParams: true });

// Rutas v1 
router.use("/usuarios", usuariosRouter);
router.use("/ecosistemas", ecosistemasRouter);
router.use("/registros", registrosRouter);
router.use("/tareas", tareasRouter);
router.use("/categorias", categoriasRouter);

export default router;