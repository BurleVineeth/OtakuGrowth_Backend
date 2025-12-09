import {
  getDailyScheduleKey,
  getWeeklyScheduleKey,
  parseUserDate,
} from "../../services/utils.service";
import { TaskType } from "../task/types";
import { TaskHistoryModel } from "./model";
import { TaskHistoryPayload } from "./types";

export class TaskHistoryService {
  public getTaskHistory(skillId: string, userId: string, dailyKey: string) {
    const date = parseUserDate(dailyKey);
    const dayKey = getDailyScheduleKey(date);
    const weekKey = getWeeklyScheduleKey(date);

    return TaskHistoryModel.find({
      skill: skillId,
      user: userId,
      $or: [{ scheduleKey: { $in: [dayKey, weekKey] } }, { type: TaskType.ONE_TIME }],
    });
  }

  public completeTask(taskPayload: TaskHistoryPayload) {
    return TaskHistoryModel.create(taskPayload);
  }
}
