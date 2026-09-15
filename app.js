
import "dotenv/config";

import express from "express";
import v1Router from "./v1/v1.routes.js";
import cors from "cors";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";
import { errorMiddleware } from "./v1/middlewares/error.middleware.js";
import connectDB from "./v1/config/db.config.js";

connectDB();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3004",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/v1", v1Router);

app.use(notFoundMiddleware);
app.use(errorMiddleware);
export default app;
