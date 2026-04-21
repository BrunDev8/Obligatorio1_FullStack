import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const usuarioSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["usuario", "admin", "administrador"],
      default: "usuario",
    },
    plan: {
      type: String,
      enum: ["estandar", "premium"],
      default: "estandar",
    },
  },
  {
    timestamps: {
      createdAt: "creadoEn",
      updatedAt: "actualizadoEn",
    },
  },
);

usuarioSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(
    this.password,
    Number(process.env.SALT_ROUNDS),
  );
});

export default mongoose.model("Usuario", usuarioSchema);
