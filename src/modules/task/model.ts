import { Schema, model } from "mongoose";
import { TaskType } from "./types";

const TaskSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    duration: { type: Number, required: true },
    type: {
      type: String,
      enum: TaskType,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    skill: { type: Schema.Types.ObjectId, ref: "Skill", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TaskModel = model("Task", TaskSchema);
