import { z } from "zod";

export interface User {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserPayload extends Omit<User, "password"> {
  _id: string;
  bio: string;
  image: string;
}

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
  image: z.string(),
  name: z.string().min(3),
});
