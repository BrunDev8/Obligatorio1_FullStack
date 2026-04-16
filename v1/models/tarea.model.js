import mongoose from "mongoose";

const tareaSchema = new mongoose.Schema(
  {
    ecosistemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ecosistema",
      required: true,
    },
    titulo: { type: String, required: true },
    descripcion: { type: String, default: "" },
    tipo: {
      type: String,
      enum: ["mantenimiento", "fertilizacion", "limpieza"],
      required: true,
    },
    frecuencia: {
      type: String,
      enum: ["diaria", "semanal", "mensual"],
      required: true,
    },
    ultimaEjecucion: { type: Date, default: null },
    proximaEjecucion: { type: Date, default: null },
    completada: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "creadoEn", updatedAt: "actualizadoEn" } },
);

export default mongoose.model("Tarea", tareaSchema);
