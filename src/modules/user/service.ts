import { User } from "./types";

export class UsersService {
  public getUsers() {
    return [];
  }

  public createUser(data: Omit<User, "id">) {
    const newUser: User = { id: Date.now(), ...data };
    return newUser;
  }
}