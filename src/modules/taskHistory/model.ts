import { Schema, model } from "mongoose";
import { TaskType } from "../task/types";

const TaskHistorySchema = new Schema(
  {
    day: { type: Number, required: true },
    weekStart: { type: Number, required: true },
    weekEnd: { type: Number, required: true },
    year: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    skill: { type: Schema.Types.ObjectId, ref: "Skill", required: true },
    task: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    type: { type: String, enum: TaskType, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TaskHistoryModel = model("TaskHistory", TaskHistorySchema);
