import dotenv from "dotenv";
import { config } from "../core/config/env";
import { ZodError } from "zod";

dotenv.config();

type PayloadValidation<T> = { success: false, errors: string[] } | { success: true, data: T }

export const getAllowedOriginUrls = () => {
  const allowedOrigins = config.ALLOWED_ORIGIN_URLS
  return (allowedOrigins ?? '')?.split(',');
}

export const validatePayload = <T>(schema: any, payload: T): PayloadValidation<T> => {
  const result = schema.safeParse(payload);

  if (!result.success) {
    const formattedErrors = (result.error as ZodError).issues.map((issue) => {
      const field = issue.path.join(".");
      return `${field}: ${issue.message}`;
    });

    return {
      success: false,
      errors: formattedErrors,
    };
  }

  return {
    success: true,
    data: result.data,
  };
};
