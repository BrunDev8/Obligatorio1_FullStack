import {
  obtenerUsuarioPorIdService,
  actualizarUsuarioService,
} from "../services/usuarios.services.js";

export const cambiarPlan = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const { plan } = req.validatedBody;

    const usuarioActual = await obtenerUsuarioPorIdService(userId);
    if (!usuarioActual) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    if (usuarioActual.plan === "premium") {
      return res
        .status(400)
        .json({ success: false, message: "Usuario ya tiene plan premium" });
    }

    const usuarioActualizado = await actualizarUsuarioService(userId, { plan });
    if (!usuarioActualizado) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    res.json({
      success: true,
      message: "Plan actualizado a premium",
      data: usuarioActualizado,
    });
  } catch (err) {
    const status = err.status || 500;

    if (status !== 500) {
      return res.status(status).json({ success: false, message: err.message });
    }

    res
      .status(500)
      .json({
        success: false,
        message: "Error al cambiar plan",
        error: err.message,
      });
  }
};
