import { getCurrentYear, getDayOfYear, getWeekRangeForDate } from "../../services/utils.service";
import { TaskHistoryModel } from "./model";
import { TaskHistoryPayload } from "./types";

export class TaskHistoryService {
  public getTaskHistory(skillId: string, userId: string) {
    return TaskHistoryModel.find({
      skill: skillId,
      user: userId,
    });
  }

  public completeTask(taskPayload: TaskHistoryPayload) {
    const day = getDayOfYear();
    const { weekStart, weekEnd } = getWeekRangeForDate();
    const year = getCurrentYear();

    const taskHistoryPayload = {
      ...taskPayload,
      day,
      weekStart,
      weekEnd,
      year,
    };

    return TaskHistoryModel.create(taskHistoryPayload);
  }
}
