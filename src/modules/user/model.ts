import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    bio: { type: String, trim: true },
    level: { type: Number, required: true },
    totalXP: { type: Number, required: true },
    class: { type: String, enum: ["E", "D", "C", "B", "A", "S"], required: true },

    /* cloudinary file upload info */
    url: { type: String },
    public_id: { type: String },
    fileType: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model("User", UserSchema);
