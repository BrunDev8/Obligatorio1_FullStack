import mongoose from "mongoose";

const registroSchema = new mongoose.Schema(
  {
    ecosistemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ecosistema",
      required: [true, "El ecosistema es obligatorio."],
    },
    temperatura: {
      type: Number,
      required: [true, "La temperatura es obligatoria."],
      min: [0, "La temperatura no puede ser menor que 0."],
      max: [100, "La temperatura no puede ser mayor que 100."],
    },
    ph: {
      type: Number,
      required: [true, "El pH es obligatorio."],
      min: [0, "El pH no puede ser menor que 0."],
      max: [14, "El pH no puede ser mayor que 14."],
    },
    humedad: {
      type: Number,
      required: [true, "La humedad es obligatoria."],
      min: [0, "La humedad no puede ser menor que 0."],
      max: [100, "La humedad no puede ser mayor que 100."],
    },
    nitratos: {
      type: Number,
      required: [true, "Los nitratos son obligatorios."],
      min: [0, "Los nitratos no pueden ser menores que 0."],
    },
    notas: {
      type: String,
      default: "",
      trim: true,
      maxlength: [500, "Las notas no pueden superar 500 caracteres."],
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
      validate: {
        validator: (value) => value <= new Date(),
        message: "La fecha de registro no puede ser futura.",
      },
    },
  },
  {
    timestamps: {
      createdAt: "creadoEn",
      updatedAt: "actualizadoEn",
    },
  },
);

export default mongoose.model("Registro", registroSchema);
