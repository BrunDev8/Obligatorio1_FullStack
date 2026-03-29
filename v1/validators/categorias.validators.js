import Joi from "joi";

export const crearCategoriaSchema = Joi.object({
  nombre: Joi.string().trim().min(3).required().messages({
    "string.base": "El nombre de la categoría debe ser un texto",
    "string.empty": "El nombre de la categoría no puede estar vacío",
    "string.min": "El nombre de la categoría debe tener al menos {#limit} caracteres",
    "any.required": "El nombre de la categoría es obligatorio",
  }),

  tipo: Joi.string().trim().min(3).required().messages({
    "string.base": "El tipo de categoría debe ser un texto",
    "string.empty": "El tipo de categoría no puede estar vacío",
    "string.min": "El tipo de categoría debe tener al menos {#limit} caracteres",
    "any.required": "El tipo de categoría es obligatorio",
  }),

  descripcion: Joi.string().allow("").max(300).messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede tener más de {#limit} caracteres",
  }).optional(),
});

export const actualizarCategoriaSchema = Joi.object({
  nombre: Joi.string().trim().min(3).messages({
    "string.base": "El nombre de la categoría debe ser un texto",
    "string.empty": "El nombre de la categoría no puede estar vacío",
    "string.min": "El nombre de la categoría debe tener al menos {#limit} caracteres",
  }).optional(),

  tipo: Joi.string().trim().min(3).messages({
    "string.base": "El tipo de categoría debe ser un texto",
    "string.empty": "El tipo de categoría no puede estar vacío",
    "string.min": "El tipo de categoría debe tener al menos {#limit} caracteres",
  }).optional(),

  descripcion: Joi.string().allow("").max(300).messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede tener más de {#limit} caracteres",
  }).optional(),
});

export default { crearCategoriaSchema, actualizarCategoriaSchema };
