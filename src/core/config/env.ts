import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT,
  ALLOWED_ORIGIN_URLS: process.env.ALLOWED_ORIGIN_URLS,
};
