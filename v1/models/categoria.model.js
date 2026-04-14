import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String, default: "" },
}, { timestamps: { createdAt: 'creadoEn', updatedAt: 'actualizadoEn' } });

export default mongoose.model("Categoria", categoriaSchema);
