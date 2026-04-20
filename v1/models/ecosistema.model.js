import mongoose from "mongoose";

const ecosistemaSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
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
      required: true,
    },
    imagenUrl: { type: String },
  },
  { timestamps: { createdAt: "creadoEn", updatedAt: "actualizadoEn" } },
);

export default mongoose.model("Ecosistema", ecosistemaSchema);
