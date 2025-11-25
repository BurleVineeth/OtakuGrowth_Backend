import { Request, Response } from "express";
import { UsersService } from "./service";
import { generateAccessToken, generateRefreshToken } from "../../services/token.service";

export class UsersController {
  public service = new UsersService();

  public getAllUsers(req: Request, res: Response) {
    return res.json(this.service.getUsers());
  }

  public async createUser(req: Request, res: Response) {
    try {
      const user = await this.service.createUser(req.body);
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: "Registered Successfully",
        user,
        accessToken,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }
}