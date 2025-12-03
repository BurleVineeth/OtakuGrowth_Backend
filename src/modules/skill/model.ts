import { Schema, model } from "mongoose";
import { SkillDifficulty } from "./types";

const SkillSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: {
      type: String,
      enum: SkillDifficulty,
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },

    /* cloudinary file upload info */
    url: { type: String, required: true },
    public_id: { type: String, required: true },
    fileType: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SkillModel = model("Skill", SkillSchema);
