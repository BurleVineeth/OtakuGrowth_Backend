import dotenv from "dotenv";
import { config } from "../core/config/env";
dotenv.config();

export const getAllowedOriginUrls = () => {
  const allowedOrigins = config.ALLOWED_ORIGIN_URLS
  return (allowedOrigins ?? '')?.split(',');
}