import { Request, Response } from 'express';
import { AuthService } from './service';
import { generateAccessToken } from '../../services/token.service';
import { config } from '../../core/config/env';
import jwt from 'jsonwebtoken';
import { JWTDecode } from './types';

export class AuthController {
  public service = new AuthService();

  public async login(req: Request, res: Response) {
    try {
      const { user, refreshToken, accessToken } = await this.service.login(req.body);

      res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: {
          user,
          accessToken,
        }
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async refresh(req: Request, res: Response) {
    try {
      const token = req.cookies.refresh_token;
      if (!token) {
        return res.status(401).json({ message: "No refresh token" });
      }

      const decoded = jwt.verify(token, config.REFRESH_TOKEN_SECRET) as JWTDecode;
      const newAccessToken = generateAccessToken({ email: decoded.email });

      res.status(200).json({
        success: true,
        message: 'Refresh token created successfully',
        data: {
          accessToken: newAccessToken
        }
      });
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
        status: 401,
      });
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      res.clearCookie("refresh_token");
      return res.json({ success: true, message: "Logged out" });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Failed to logout',
        status: 400,
      });
    }
  }
}