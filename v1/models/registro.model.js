import mongoose from "mongoose";

const registroSchema = new mongoose.Schema({
  ecosistemaId: { type: mongoose.Schema.Types.ObjectId, ref: "Ecosistema", required: true },
  temperatura: { type: Number, required: true },
  ph: { type: Number, required: true },
  humedad: { type: Number, required: true },
  nitratos: { type: Number, required: true },
  notas: { type: String, default: "" },
  fechaRegistro: { type: Date, default: Date.now },
}, { timestamps: { createdAt: 'creadoEn', updatedAt: 'actualizadoEn' } });

export default mongoose.model("Registro", registroSchema);
