import Joi from "joi";

export const crearUsuarioSchema = Joi.object({
  nombreUsuario: Joi.string().trim().lowercase().min(4).max(20).required().messages({
    "string.base": "El nombre de usuario debe ser un texto",
    "string.empty": "El nombre de usuario no puede estar vacío",
    "string.min": "El nombre de usuario debe tener al menos {#limit} caracteres",
    "string.max": "El nombre de usuario no puede tener más de {#limit} caracteres",
    "any.required": "El nombre de usuario es obligatorio",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.base": "El email debe ser un texto",
    "string.email": "El email debe tener un formato válido",
    "string.empty": "El email no puede estar vacío",
    "any.required": "El email es obligatorio",
  }),

  contraseña: Joi.string().min(6).max(30).required().messages({
    "string.base": "La contraseña debe ser un texto",
    "string.empty": "La contraseña no puede estar vacía",
    "string.min": "La contraseña debe tener al menos {#limit} caracteres",
    "string.max": "La contraseña no puede tener más de {#limit} caracteres",
    "any.required": "La contraseña es obligatoria",
  }),

  rol: Joi.string().valid("usuario", "admin").required().messages({
    "any.only": "El rol debe ser usuario o admin",
    "any.required": "El rol es obligatorio",
  }),
});

export const buscarUsuarioSchema = Joi.string().trim().min(3).required().messages({
  "string.base": "El nombre debe ser un texto",
  "string.empty": "El nombre no puede estar vacío",
  "string.min": "El nombre debe tener al menos {#limit} caracteres",
  "any.required": "El nombre es obligatorio",
});

export default { crearUsuarioSchema };