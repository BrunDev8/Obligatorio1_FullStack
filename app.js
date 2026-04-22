import express from "express";
import v1Router from "./v1/v1.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";
import connectDB from "./v1/config/db.config.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use((err, req, res, next) => {
  if (err && err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, message: 'JSON inválido' });
  }
  if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ success: false, message: 'JSON inválido' });
  }
  next(err);
});

app.get("/", (req, res) => {
  res.send("¡Respuesta desde el servidor a la raiz!");
});

app.use("/v1", v1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
export default app;
