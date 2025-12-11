import { Types } from "mongoose";
import { TaskType } from "../task/types";

export type TaskHistoryPayload = {
  skill: string;
  user: string;
  task: string;
  type: TaskType;
  scheduleKey: string;
};

export interface TaskHistory {
  _id: Types.ObjectId;
  scheduleKey?: string;
  user?: Types.ObjectId;
  skill?: Types.ObjectId;
  task?: Types.ObjectId;
  type?: TaskType;
}
