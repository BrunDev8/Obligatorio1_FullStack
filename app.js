import express from "express";
import v1Router from "./v1/v1.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import { notFoundMiddleware } from "./v1/middlewares/notFound.middleware.js";

dotenv.config();

const app = express();

app.use(cors(/* {
    origin: "http://localhost:5500",
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
} */));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("¡Respuesta desde el servidor a la raiz!");
})

app.use("/v1", v1Router);

app.use(notFoundMiddleware);

export default app;