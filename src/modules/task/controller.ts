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

  public async getTasks(req: Request, res: Response) {
    try {
      const { skillId, userId } = req.query;

      // Validate Skill ID
      if (!skillId) {
        throw new Error("Skill Id is required");
      }

      if (typeof skillId !== "string") {
        throw new Error("Skill Id must be a string");
      }

      // Optional: Validate User ID if needed
      if (userId && typeof userId !== "string") {
        throw new Error("User Id must be a string");
      }

      if (!userId) {
        throw new Error("User Id is required");
      }

      const tasks = await this.taskService.getTasks(skillId, userId);

      return res.status(200).json({
        success: true,
        data: { tasks },
        message: "Tasks retrieved successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async updateTask(req: Request, res: Response) {
    try {
      const task = req.body;
      const { taskId } = req.params;

      if (!taskId) {
        throw new Error("Task ID is required");
      }

      const updatedTask = await this.taskService.updateTask(taskId, task);

      res.status(200).json({
        success: true,
        data: {
          task: updatedTask,
        },
        message: "Task updated successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async deleteTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;

      if (!taskId) {
        throw new Error("Task ID is required");
      }

      await this.taskService.deleteTask(taskId);

      res.status(200).json({
        success: true,
        message: "Task deleted successfully",
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
