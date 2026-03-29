import Joi from "joi";

export const crearTareaSchema = Joi.object({
  ecosistemaId: Joi.number().integer().required().messages({
    "number.base": "El id del ecosistema debe ser un número",
    "number.integer": "El id del ecosistema debe ser un entero",
    "any.required": "El id del ecosistema es obligatorio",
  }),

  titulo: Joi.string().trim().min(3).required().messages({
    "string.base": "El título debe ser un texto",
    "string.empty": "El título no puede estar vacío",
    "string.min": "El título debe tener al menos {#limit} caracteres",
    "any.required": "El título es obligatorio",
  }),

  descripcion: Joi.string().allow("").max(500).messages({
    "string.base": "La descripción debe ser un texto",
    "string.max": "La descripción no puede tener más de {#limit} caracteres",
  }).optional(),

  tipo: Joi.string().valid("mantenimiento", "fertilizacion", "limpieza").required().messages({
    "any.only": "El tipo de tarea debe ser: mantenimiento, fertilizacion o limpieza",
    "any.required": "El tipo de tarea es obligatorio",
  }),

  frecuencia: Joi.string().valid("diaria", "semanal", "mensual").required().messages({
    "any.only": "La frecuencia debe ser diaria, semanal o mensual",
    "any.required": "La frecuencia es obligatoria",
  }),

  ultimaEjecucion: Joi.date().optional().allow(null).messages({
    "date.base": "La fecha de la última ejecución debe ser una fecha válida",
  }),

  proximaEjecucion: Joi.date().optional().allow(null).messages({
    "date.base": "La fecha de la próxima ejecución debe ser una fecha válida",
  }),

  completada: Joi.boolean().optional().messages({
    "boolean.base": "El campo completada debe ser un booleano",
  }),
});

export default { crearTareaSchema };
