import { Request, Response } from "express";
import { TaskService } from "./service";

export class TaskController {
  private taskService = new TaskService();

  public async addTask(req: Request, res: Response) {
    try {
      const response = await this.taskService.addTask(req.body);

      res.status(200).json({
        success: true,
        data: {
          task: response,
        },
        message: "Task added successfully",
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
