import mongoose from "mongoose";

const ecosistemaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["acuario", "planta", "terrario"],
      required: true,
    },
    descripcion: {
      type: String,
    },
    tamano: {
      type: Number,
    },
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
    },
    imagenUrl: { type: String },
  },
  { timestamps: { createdAt: "creadoEn", updatedAt: "actualizadoEn" } },
);

export default mongoose.model("Ecosistema", ecosistemaSchema);
