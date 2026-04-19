import Joi from 'joi';

export const registerSchema = Joi.object({
    username: Joi.string().trim().min(3).max(30).required().messages({
        'string.empty': 'El nombre de usuario es obligatorio',
        'string.min': 'El nombre de usuario debe tener al menos {#limit} caracteres',
        'string.max': 'El nombre de usuario no puede tener más de {#limit} caracteres'
    }),
    email: Joi.string().trim().email().required().messages({
        'string.empty': 'El correo electrónico es obligatorio',
        'string.email': 'El correo electrónico no es válido'
    }),
    password: Joi.string().trim().min(6).max(100).required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
        'string.max': 'La contraseña no puede tener más de {#limit} caracteres'
    }),
    confirmPassword: Joi.string().trim().valid(Joi.ref('password')).required().messages({
        'any.only': 'Las contraseñas no coinciden',
        'string.empty': 'La confirmación de contraseña es obligatoria'
    }),
    rol: Joi.string().trim().lowercase().valid('usuario', 'admin', 'administrador').default('usuario').messages({
        'any.only': 'El rol debe ser "usuario" o "admin/administrador"',
        'string.base': 'El rol debe ser un texto'
    }),
    plan: Joi.string().trim().valid('estandar', 'premium').default('estandar').messages({
        'any.only': 'El plan debe ser "estandar" o "premium"',
        'string.base': 'El plan debe ser un texto'
    })
});

export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required().messages({
        'string.empty': 'El correo electrónico es obligatorio',
        'string.email': 'El correo electrónico no es válido'
    }),
    password: Joi.string().trim().min(6).max(100).required().messages({
        'string.empty': 'La contraseña es obligatoria',
        'string.min': 'La contraseña debe tener al menos {#limit} caracteres',
        'string.max': 'La contraseña no puede tener más de {#limit} caracteres'
    })
});
