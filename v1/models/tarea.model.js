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
      enum: ["mantenimiento", "fertilizacion", "limpieza", "cambio_agua", "dosificacion", "medicion"],
      required: true,
    },
    frecuencia: {
      type: String,
      enum: ["diaria", "semanal", "mensual"],
      required: true,
    },
    fechaInicio: { type: String, default: "" },
    hora: { type: String, default: "" },
    aviso: { type: String, default: "" },
    activa: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Tarea", tareaSchema);
