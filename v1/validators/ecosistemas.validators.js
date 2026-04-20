import Joi from "joi";

const aliasTamano = (schema) => schema.rename("tamaño", "tamano", { ignoreUndefined: true, override: true });

export const crearEcosistemaSchema = aliasTamano(Joi.object({
  nombre: Joi.string().trim().min(3).max(30).required().messages({
    "string.base": "El nombre del ecosistema debe ser un texto",
    "string.empty": "El nombre del ecosistema no puede estar vacío",
    "string.min": "El nombre del ecosistema debe tener al menos {#limit} caracteres",
    "string.max": "El nombre del ecosistema no puede tener más de {#limit} caracteres",
    "any.required": "El nombre del ecosistema es obligatorio",
  }),

  descripcion: Joi.string().allow("").max(200).messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede tener más de {#limit} caracteres",
  }).optional(),
  tamano: Joi.number().positive().messages({
    "number.base": "El tamaño debe ser un número",
    "number.positive": "El tamaño debe ser un valor positivo",
  }).optional(),

  usuarioId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
    "string.base": "El usuarioId debe ser un texto (ObjectId)",
    "string.pattern.base": "El usuarioId debe ser un ObjectId válido",
  }).optional(),

  categoriaId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "La categoría debe ser un texto (ObjectId)",
    "string.pattern.base": "La categoriaId debe ser un ObjectId válido",
    "any.required": "La categoriaId es obligatoria",
  }),

  imagenUrl: Joi.string().uri().optional().messages({
    "string.uri": "La imagenUrl debe ser una URL válida",
  }),
}));

export const actualizarEcosistemaSchema = aliasTamano(Joi.object({
  nombre: Joi.string().trim().min(3).max(30).messages({
    "string.base": "El nombre del ecosistema debe ser un texto",
    "string.empty": "El nombre del ecosistema no puede estar vacío",
    "string.min": "El nombre del ecosistema debe tener al menos {#limit} caracteres",
    "string.max": "El nombre del ecosistema no puede tener más de {#limit} caracteres",
  }).optional(),

  descripcion: Joi.string().allow("").max(200).messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede tener más de {#limit} caracteres",
  }).optional(),

  tamano: Joi.number().positive().messages({
    "number.base": "El tamaño debe ser un número",
    "number.positive": "El tamaño debe ser un valor positivo",
  }).optional(),

  usuarioId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
    "string.base": "El usuarioId debe ser un texto (ObjectId)",
    "string.pattern.base": "El usuarioId debe ser un ObjectId válido",
  }).optional(),

  categoriaId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).messages({
    "string.base": "La categoría debe ser un texto (ObjectId)",
    "string.pattern.base": "La categoriaId debe ser un ObjectId válido",
  }).optional(),

  imagenUrl: Joi.string().uri().optional().messages({
    "string.uri": "La imagenUrl debe ser una URL válida",
  }),
}));

export default { crearEcosistemaSchema, actualizarEcosistemaSchema };
