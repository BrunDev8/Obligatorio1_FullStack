import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const ROUNDS = 12;

let usuarios = [];

export const ingresarUsuario = (req, res) => {
    const { username, password } = req.body;
    const usuario = usuarios.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (!usuario) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const valid = bcrypt.compareSync(password, usuario.password);
    if (!valid) {
        return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1d" });
    res.json({ message: "Usuario ingresado correctamente", token });
}

export const registrarUsuario = (req, res) => {
    const { username, password } = req.body;

    const usuarioExistente = usuarios.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (usuarioExistente) {
        return res.status(409).json({ message: "El nombre de usuario ya existe" });
    }
    const passwordHash = bcrypt.hashSync(password, ROUNDS);
    usuarios.push({ username, password: passwordHash });

    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1d" });
    res.json({ message: "Usuario registrado correctamente", token });
}