import { z } from "zod";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload extends Omit<User, "password"> {
  _id: string;
  bio: string;
  url: string;
  public_id: string;
  fileType: string;
}

export interface UpdateUserLevelPayload {
  _id: string;
  level: number;
  totalXP: number;
  class: UserClass;
}

export type UserClass = "E" | "D" | "C" | "B" | "A" | "S";

export const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine((v) => /[A-Z]/.test(v), {
      message: "One uppercase letter",
    })
    .refine((v) => /[a-z]/.test(v), {
      message: "One lowercase letter",
    })
    .refine((v) => /\d/.test(v), {
      message: "One number",
    })
    .refine((v) => /[@$!%*?&]/.test(v), {
      message: "One special character (@$!%*?&)",
    }),
});

export const updateUserSchema = z.object({
  bio: z.string(),
  email: z.email(),
  url: z.string(),
  public_id: z.string().optional(),
  fileType: z.string().optional(),
  name: z.string().min(3),
});

export const updateUserLevelSchema = z.object({
  class: z.string(),
  level: z.number(),
  totalXP: z.number(),
});
