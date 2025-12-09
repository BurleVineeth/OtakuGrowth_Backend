import dotenv from "dotenv";
import { config } from "../core/config/env";
import { ZodError } from "zod";

dotenv.config();

type PayloadValidation<T> = { success: false; errors: string[] } | { success: true; data: T };

export const getAllowedOriginUrls = () => {
  const allowedOrigins = config.ALLOWED_ORIGIN_URLS;
  return (allowedOrigins ?? "")?.split(",");
};

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

// "YYYY-MM-DD"
export const parseUserDate = (dateStr: string): Date => {
  // This forces the date to be interpreted as UTC midnight of the user's local date.
  return new Date(`${dateStr}T00:00:00.000Z`);
};

export const getDailyScheduleKey = (date: Date): string => {
  return date.toISOString().slice(0, 10); // "YYYY-MM-DD"
};

export const getWeeklyScheduleKey = (date: Date): string => {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const dayNum = d.getUTCDay() || 7;

  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  return `${d.getUTCFullYear()}-W${weekNumber}`;
};
