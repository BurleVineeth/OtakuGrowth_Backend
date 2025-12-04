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
}
