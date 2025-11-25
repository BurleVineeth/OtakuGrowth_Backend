import { validatePayload } from "../../services/utils.service";
import { UserModel } from "./model";
import { createUserSchema, User } from "./types";
import bcrypt from 'bcrypt';

export class UsersService {
  public getUsers() {
    return UserModel.find();
  }

  public async createUser(data: User) {
    try {
      const exists = await UserModel.findOne({ email: data.email });
      if (exists) {
        throw new Error("Email already exists");
      }

      const validation = validatePayload<User>(createUserSchema, data);

      if (!validation.success) {
        throw new Error(validation.errors.join(", "));
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
}