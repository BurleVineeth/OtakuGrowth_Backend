import { getDailyScheduleKey, getWeeklyScheduleKey } from "../../services/utils.service";
import { TaskType } from "../task/types";
import { TaskHistoryModel } from "./model";
import { TaskHistoryPayload } from "./types";

export class TaskHistoryService {
  public getTaskHistory(skillId: string, userId: string) {
    const dayKey = getDailyScheduleKey();
    const weekKey = getWeeklyScheduleKey();

    return TaskHistoryModel.find({
      skill: skillId,
      user: userId,
      scheduleKey: { $in: [dayKey, weekKey] },
    });
  }

  public completeTask(taskPayload: TaskHistoryPayload) {
    const scheduleKey =
      taskPayload.type === TaskType.DAILY
        ? getDailyScheduleKey()
        : taskPayload.type === TaskType.WEEKLY
          ? getWeeklyScheduleKey()
          : taskPayload.task.toString();

    const taskHistoryPayload = {
      ...taskPayload,
      scheduleKey,
    };

    return TaskHistoryModel.create(taskHistoryPayload);
  }
}
