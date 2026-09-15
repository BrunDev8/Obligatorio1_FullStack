export const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || err.status || (err.name === "ValidationError" ? 400 : 500);
  if (err.name === "ValidationError") {
    return res.status(status).json({
      message: "Datos inválidos",
      errors: Object.entries(err.errors).map(([field, value]) => ({ field, message: value.message })),
    });
  }
  return res.status(status).json({ message: err.message || "Error interno del servidor" });
};
