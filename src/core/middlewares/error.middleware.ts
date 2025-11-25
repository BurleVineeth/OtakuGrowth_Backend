import { Request, Response, NextFunction } from "express";

export default function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("🚀 ~ errorMiddleware ~ err:", err)

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
}
