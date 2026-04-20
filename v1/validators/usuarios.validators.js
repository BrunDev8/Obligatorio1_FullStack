import Joi from "joi";

export const buscarUsuarioSchema = Joi.string().trim().lowercase().min(3).required().messages({
  "string.base": "El nombre debe ser un texto",
  "string.empty": "El nombre no puede estar vacío",
  "string.min": "El nombre debe tener al menos {#limit} caracteres",
  "any.required": "El nombre es obligatorio",
});

export const cambiarPlanSchema = Joi.object({
  plan: Joi.string().trim().lowercase().valid("premium").required().messages({
    "any.only": "Solo puedes cambiar a plan premium",
    "any.required": "El plan es obligatorio",
  }),
});