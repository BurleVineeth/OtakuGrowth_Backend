import dotenv from "dotenv";
import { StringValue } from "ms";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  ALLOWED_ORIGIN_URLS: process.env.ALLOWED_ORIGIN_URLS,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
  ACCESS_TOKEN_EXPIRES_IN: (process.env.ACCESS_TOKEN_EXPIRES_IN as StringValue) || "15m",
  REFRESH_TOKEN_EXPIRES_IN: (process.env.REFRESH_TOKEN_EXPIRES_IN as StringValue) || "7d",
};
