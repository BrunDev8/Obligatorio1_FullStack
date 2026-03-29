import Joi from "joi";

export const crearRegistroSchema = Joi.object({
  ecosistemaId: Joi.number().integer().required().messages({
    "number.base": "El id del ecosistema debe ser un número",
    "number.integer": "El id del ecosistema debe ser un entero",
    "any.required": "El id del ecosistema es obligatorio",
  }),

  temperatura: Joi.number().required().messages({
    "number.base": "La temperatura debe ser un número",
    "any.required": "La temperatura es obligatoria",
  }),

  ph: Joi.number().required().messages({
    "number.base": "El pH debe ser un número",
    "any.required": "El pH es obligatorio",
  }),

  humedad: Joi.number().required().messages({
    "number.base": "La humedad debe ser un número",
    "any.required": "La humedad es obligatoria",
  }),

  nitratos: Joi.number().required().messages({
    "number.base": "Los nitratos deben ser un número",
    "any.required": "El nivel de nitratos es obligatorio",
  }),

  notas: Joi.string().allow("").max(500).messages({
    "string.base": "Las notas deben ser un texto",
    "string.max": "Las notas no pueden tener más de {#limit} caracteres",
  }).optional(),

  fechaRegistro: Joi.date().optional().messages({
    "date.base": "La fecha de registro debe ser una fecha válida",
  }),
});

export default { crearRegistroSchema };
