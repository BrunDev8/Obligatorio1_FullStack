import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'El nombre de usuario es obligatorio',
        'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
        'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres'
    }),
    password: Joi.string().trim().min(6).max(100).required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
        'string.max': 'La contraseña no puede tener más de {#limit} caracteres'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Las contraseñas no coinciden'
    })
});

export const loginSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'El nombre de usuario es obligatorio',
        'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
        'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres'
    }),
    password: Joi.string().trim().min(6).max(100).required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
        'string.max': 'La contraseña no puede tener más de {#limit} caracteres'
    })
});