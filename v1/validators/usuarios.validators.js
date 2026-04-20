import Joi from "joi";

export const cambiarPlanSchema = Joi.object({
  plan: Joi.string().trim().lowercase().valid("premium").required().messages({
    "any.only": "Solo puedes cambiar a plan premium",
    "any.required": "El plan es obligatorio",
  }),
});