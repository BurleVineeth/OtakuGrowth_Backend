import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import apiRouter from './router'
import { getAllowedOriginUrls } from "./services/utils.service";
import { authMiddleware } from "./middleware/authMiddleware";

const app = express();
const allowedOrigins = getAllowedOriginUrls();

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authMiddleware);
app.use("/api", apiRouter);

export default app;
