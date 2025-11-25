import { Request, Response } from "express";
import { UsersService } from "./service";

export class UsersController {
  public service = new UsersService();

  public getAllUsers(req: Request, res: Response) {
    return res.json(this.service.getUsers());
  }

  public createUser(req: Request, res: Response) {
    const user = this.service.createUser(req.body);
    return res.status(201).json(user);
  }
}