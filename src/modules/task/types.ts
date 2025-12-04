import z from "zod";

export enum TaskType {
  ONE_TIME = "oneTime",
  DAILY = "daily",
  WEEKLY = "weekly",
}

export type TaskPayload = {
  name: string;
  description: string;
  duration: number;
  type: TaskType;
  user: string;
  skill: string;
};

export const TaskSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  duration: z.number().min(1, "Duration must be at least 1 minute"),
  type: z.enum([TaskType.ONE_TIME, TaskType.DAILY, TaskType.WEEKLY]),
  user: z.string(),
  skill: z.string(),
});
