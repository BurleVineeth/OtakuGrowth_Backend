import { Request, Response } from "express";
import { TaskHistoryService } from "./service";

export class TaskHistoryController {
  private taskHistoryService = new TaskHistoryService();

  public async completeTask(req: Request, res: Response) {
    try {
      await this.taskHistoryService.completeTask(req.body);

      res.status(200).json({
        success: true,
        message: "Task completed successfully",
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
