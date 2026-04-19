import { loginService, registrarUsuarioService } from "../services/auth.services.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.validatedBody || req.body;
        const result = await loginService(email, password);
        if (!result.success) return res.status(401).json({ message: result.message });
        res.json({ message: "Usuario ingresado correctamente", token: result.token });
    } catch (err) {
        res.status(500).json({ message: "Error al ingresar usuario", error: err.message });
    }
};

export const registrarUsuario = async (req, res) => {
    try {
        const { username, email, password, rol, plan } = req.validatedBody || req.body;
        const result = await registrarUsuarioService(username, email, password, rol, plan);
        if (!result.success) return res.status(409).json({ message: result.message });
        res.json({ message: "Usuario registrado correctamente", token: result.token });
    } catch (err) {
        res.status(500).json({ message: "Error al registrar usuario", error: err.message });
    }
};