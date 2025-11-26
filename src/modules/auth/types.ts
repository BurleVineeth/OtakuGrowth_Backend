import z, { email } from "zod";

export type LoginCredentials = {
  email: string;
  password: string;
};

export const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export type JWTDecode = { email: string; iat: number; exp: number };
