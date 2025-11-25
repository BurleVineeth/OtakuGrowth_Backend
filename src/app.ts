import express from "express";
import cors from "cors";
import apiRouter from './router'
import { getAllowedOriginUrls } from "./services/utils.service";

const app = express();
const allowedOrigins = getAllowedOriginUrls();

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

app.use("/api", apiRouter);

export default app;
