import jwt from "jsonwebtoken";
import { validatePayload } from "../../services/utils.service";
import { UserModel } from "./model";
import { createUserSchema, User } from "./types";
import bcrypt from "bcrypt";
import { config } from "../../core/config/env";
import { JWTDecodeType } from "../auth/types";

export class UsersService {
  public getUsers() {
    return UserModel.find();
  }

  public async createUser(data: User) {
    try {
      const validation = validatePayload<User>(createUserSchema, data);
      if (!validation.success) {
        throw new Error(validation.errors.join(", "));
      }

      const exists = await UserModel.findOne({ email: data.email });
      if (exists) {
        throw new Error("Email already exists");
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;

      const user = await UserModel.create(data);
      const userObj = user.toObject();
      const { password, ...userWithoutPassword } = userObj;

      return userWithoutPassword;
    } catch (error) {
      throw error;
    }
  }

  public async getUser(accessToken: string) {
    try {
      const decode = jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET) as JWTDecodeType;
      const user = await UserModel.findOne({ email: decode.email });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
