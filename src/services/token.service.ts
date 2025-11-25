import jwt, { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import { config } from "../core/config/env";

export const generateAccessToken = (user: { _id: Types.ObjectId; email: string }) => {
  const options: SignOptions = { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN };
  return jwt.sign({ id: user._id, email: user.email }, config.ACCESS_TOKEN_SECRET, options);
};

export const generateRefreshToken = (user: { _id: Types.ObjectId; email: string }) => {
  const options: SignOptions = { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN };
  return jwt.sign({ id: user._id, email: user.email }, config.REFRESH_TOKEN_SECRET, options);
};
