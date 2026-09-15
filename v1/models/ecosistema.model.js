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
    categoriaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    imagenUrl: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("Ecosistema", ecosistemaSchema);
