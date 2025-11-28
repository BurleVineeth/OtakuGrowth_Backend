import { Request, Response } from "express";
import { UsersService } from "./service";
import { generateAccessToken, generateRefreshToken } from "../../services/token.service";
import { CookieKeys } from "../../constants";

export class UsersController {
  public service = new UsersService();

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.service.getUsers();

      res.status(200).json({
        success: true,
        message: "Get Users",
        data: { users },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async createUser(req: Request, res: Response) {
    try {
      const user = await this.service.createUser(req.body);
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      res.cookie(CookieKeys.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        success: true,
        message: "Registered Successfully",
        data: {
          user,
          accessToken,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async getUser(req: Request, res: Response) {
    try {
      const accessToken = (req.headers.authorization ?? "").split(" ")[1];
      if (!accessToken) {
        throw new Error("Access Token is required");
      }

      const user = await this.service.getUser(accessToken as string);

      res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: {
          user,
        },
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      await this.service.updateUser(req.body);

      res.status(200).json({
        success: true,
        message: "Changes saved successfully",
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
