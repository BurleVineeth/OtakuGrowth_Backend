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
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  CLOUD_API_KEY: process.env.CLOUD_API_KEY as string,
  CLOUD_API_SECRET: process.env.CLOUD_API_SECRET as string,
  RESEND_API_KEY: process.env.RESEND_API_KEY!,
  SENDER_EMAIL: process.env.SENDER_EMAIL!,
  NODE_MAILER_APP_PASSWORD: process.env.NODE_MAILER_APP_PASSWORD!,
};
