import Joi from "joi";

export const crearRegistroParametroSchema = Joi.object({
  ecosistemaId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
    "string.base": "El id del ecosistema debe ser un texto (ObjectId)",
    "string.pattern.base": "El id del ecosistema debe ser un ObjectId válido",
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

  kh: Joi.number().min(0).optional().messages({
    "number.base": "El KH debe ser un número",
    "number.min": "El KH no puede ser menor que 0",
  }),

  tds: Joi.number().min(0).optional().messages({
    "number.base": "El TDS debe ser un número",
    "number.min": "El TDS no puede ser menor que 0",
  }),

  salinidad: Joi.number().min(1).max(1.04).optional().messages({
    "number.base": "La salinidad debe ser un número",
    "number.min": "La salinidad no es válida",
    "number.max": "La salinidad no es válida",
  }),
  humedad: Joi.number().min(1).max(1.04).optional(),

  nitratos: Joi.number().required().messages({
    "number.base": "Los nitratos deben ser un número",
    "any.required": "El nivel de nitratos es obligatorio",
  }),

  notas: Joi.string().allow("").max(500).messages({
    "string.base": "Las notas deben ser un texto",
    "string.max": "Las notas no pueden tener más de {#limit} caracteres",
  }).optional(),

  fecha: Joi.string().optional(),
  hora: Joi.string().optional(),
}).custom((value, helpers) => {
  if (value.salinidad === undefined && value.humedad === undefined) {
    return helpers.error("any.custom");
  }
  return value;
}).messages({ "any.custom": "La salinidad es obligatoria" });

export const crearRegistroSchema = crearRegistroParametroSchema;

export default { crearRegistroParametroSchema, crearRegistroSchema };
