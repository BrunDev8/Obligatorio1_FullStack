import { obtenerUsuarioPorNombreService, actualizarUsuarioService, obtenerUsuarioPorIdService } from "../services/usuarios.services.js";
import { buscarUsuarioSchema, cambiarPlanSchema } from "../validators/usuarios.validators.js";

export const buscarUsuario = async (req, res) => {
  try {
    const username = req.params.username;
    const { error, value } = buscarUsuarioSchema.validate(username, { abortEarly: false });
    if (error) return res.status(400).json({ success: false, message: "Error en validación", error: error.details });
    const resultado = await obtenerUsuarioPorNombreService(value);
    res.json({ success: true, message: "Usuario(s) encontrado(s)", data: resultado });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al buscar usuario", error: err.message });
  }
};

export const cambiarPlan = async (req, res) => {
  try {
    const userId = req.decoded.id;
    const body = req.validatedBody || req.body;
    
    const usuarioActual = await obtenerUsuarioPorIdService(userId);
    if (!usuarioActual) {
      return res.status(404).json({ success: false, message: "Usuario no encontrado" });
    }
    
    if (usuarioActual.plan === "premium") {
      return res.status(400).json({ success: false, message: "Usuario ya tiene plan premium" });
    }
    
    const usuarioActualizado = await actualizarUsuarioService(userId, { plan: body.plan });
    res.json({ success: true, message: "Plan actualizado a premium", data: usuarioActualizado });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error al cambiar plan", error: err.message });
  }
};
