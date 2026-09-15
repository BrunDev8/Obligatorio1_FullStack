import mongoose from "mongoose";

const registroParametroSchema = new mongoose.Schema(
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
    salinidad: {
      type: Number,
      required: [true, "La salinidad es obligatoria."],
      min: [1, "La salinidad no puede ser menor que 1.000."],
      max: [1.04, "La salinidad no puede ser mayor que 1.040."],
    },
    humedad: { type: Number, min: 1, max: 1.04 },
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
    fecha: { type: String, default: "" },
    hora: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model(
  "RegistroParametro",
  registroParametroSchema,
  "registroParametro",
);
