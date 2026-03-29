import Joi from "joi";

export const crearEcosistemaSchema = Joi.object({
  nombre: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "El nombre del ecosistema debe ser un texto",
    "string.empty": "El nombre del ecosistema no puede estar vacío",
    "string.min": "El nombre del ecosistema debe tener al menos {#limit} caracteres",
    "string.max": "El nombre del ecosistema no puede tener más de {#limit} caracteres",
    "any.required": "El nombre del ecosistema es obligatorio",
  }),

  tipo: Joi.string().valid("acuario", "planta").required().messages({
    "any.only": "El tipo debe ser acuario o planta",
    "any.required": "El tipo es obligatorio",
  }),

  descripcion: Joi.string().allow("").max(200).messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede tener más de {#limit} caracteres",
  }),

  tamaño: Joi.number().positive().required().messages({
    "number.base": "El tamaño debe ser un número",
    "number.positive": "El tamaño debe ser un valor positivo",
    "any.required": "El tamaño es obligatorio",
  }),

  categoriaId: Joi.string().required().messages({
    "string.base": "La categoría debe ser un identificador válido",
    "any.required": "La categoría es obligatoria",
  }),
});

export default { crearEcosistemaSchema };
