export const validateBodyMiddleware = (schema) => (req, res, next) => {
  const bodyToValidate = req.body ?? {};
  const { error, value } = schema.validate(bodyToValidate, { abortEarly: false, convert: true, stripUnknown: true });
  if (error) {
    const errors = error.details.map((d) => ({
      field: Array.isArray(d.path) && d.path.length ? d.path.join('.') : '',
      message: d.message,
    }));
    return res.status(400).json({ mensaje: "Error en validación", errors });
  }
  req.validatedBody = value;
  next();
};
