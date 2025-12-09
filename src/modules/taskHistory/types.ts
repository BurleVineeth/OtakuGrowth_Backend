import { TaskType } from "../task/types";

export type TaskHistoryPayload = {
  skill: string;
  user: string;
  task: string;
  type: TaskType;
  scheduleKey: string;
};
