import { generateAccessToken, generateRefreshToken } from "../../services/token.service";
import { validatePayload } from "../../services/utils.service";
import { UserModel } from "../user/model";
import { LoginCredentials, LoginSchema } from "./types";
import bcrypt from 'bcrypt';

export class AuthService {
  public async login(userCredentials: LoginCredentials) {
    try {
      const validation = validatePayload<LoginCredentials>(LoginSchema, userCredentials);
      if (!validation.success) {
        throw new Error(validation.errors.join(", "));
      }

      const existUser = await UserModel.findOne({ email: userCredentials.email });
      if (!existUser) {
        throw new Error('Invalid email');
      }

      const isValid = await bcrypt.compare(userCredentials.password, existUser.password);
      if (!isValid) throw new Error("Invalid password");

      const accessToken = generateAccessToken(existUser);
      const refreshToken = generateRefreshToken(existUser);

      return { user: existUser, accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}