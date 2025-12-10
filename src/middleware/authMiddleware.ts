import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../core/config/env";
import { Routes } from "../constants";

const publicRoutes = [
  { method: "POST", path: `/api/${Routes.LOGIN}` },
  { method: "POST", path: `/api/${Routes.CREATE_USER}` },
  { method: "POST", path: `/api/${Routes.REFRESH}` },
];

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const isPublic = publicRoutes.some(
      (route) => route.method === req.method && route.path === req.path
    );

    if (isPublic) {
      return next();
    }

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("Access Token is missing");
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired access token" });
  }
};
