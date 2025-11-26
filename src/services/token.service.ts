import jwt, { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "../core/config/env";

export const generateAccessToken = (user: { email: string }) => {
  const options: SignOptions = { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN };
  return jwt.sign({ email: user.email }, config.ACCESS_TOKEN_SECRET, options);
};

export const generateRefreshToken = (user: { email: string }) => {
  const options: SignOptions = { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN };
  return jwt.sign({ email: user.email }, config.REFRESH_TOKEN_SECRET, options);
};
