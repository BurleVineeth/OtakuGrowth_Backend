import jwt from "jsonwebtoken";
import { validatePayload } from "../../services/utils.service";
import { UserModel } from "./model";
import { createUserSchema, UpdateUserPayload, updateUserSchema, User } from "./types";
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
      const user = await UserModel.findOne({ email: decode.email }).select({
        name: 1,
        email: 1,
        url: 1,
        public_id: 1,
        fileType: 1,
        bio: 1,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(data: UpdateUserPayload) {
    try {
      const { _id, ...userDetails } = data;
      const validation = validatePayload<Omit<UpdateUserPayload, "_id">>(
        updateUserSchema,
        userDetails
      );

      if (!validation.success) {
        throw new Error(validation.errors.join(", "));
      }

      const exists = await UserModel.findOne({ email: data.email });
      if (exists && exists._id.toString() !== _id) {
        throw new Error("Email already exists");
      }

      await UserModel.updateOne({ _id }, userDetails);
    } catch (error) {
      throw error;
    }
  }
}
