import { validatePayload } from "../../services/utils.service";
import { TaskModel } from "./model";
import { TaskPayload, TaskSchema } from "./types";

export class TaskService {
  public addTask(taskPayload: TaskPayload) {
    const validation = validatePayload<TaskPayload>(TaskSchema, taskPayload);
    if (!validation.success) {
      throw new Error(validation.errors.join(", "));
    }

    return TaskModel.create(taskPayload);
  }

  public getTasks(skillId: string, userId: string) {
    const filter = { skill: skillId, user: userId };
    return TaskModel.find(filter).select({
      updatedAt: 0,
    });
  }

  public updateTask(taskId: string, taskPayload: TaskPayload) {
    const validation = validatePayload<TaskPayload>(TaskSchema, taskPayload);
    if (!validation.success) {
      throw new Error(validation.errors.join(", "));
    }

    return TaskModel.findByIdAndUpdate(taskId, taskPayload, { new: true });
  }

  public deleteTask(taskId: string) {
    return TaskModel.findByIdAndDelete(taskId);
  }

  public deleteTasks(skillId: string) {
    return TaskModel.deleteMany({ skill: skillId });
  }
}
