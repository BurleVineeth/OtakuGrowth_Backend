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

export const getDayOfYear = (date = new Date()): number => {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.floor(diff / oneDay);
};

export const getWeekRangeForDate = (
  date: Date = new Date()
): { weekStart: number; weekEnd: number } => {
  const d = new Date(date);

  // Convert Sunday (0) to 7 to make Monday=1 ... Sunday=7
  const day = d.getDay() === 0 ? 7 : d.getDay();

  // Calculate Monday
  const monday = new Date(d);
  monday.setDate(d.getDate() - (day - 1));
  monday.setHours(0, 0, 0, 0);

  // Calculate Sunday
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  return {
    weekStart: monday.getTime(),
    weekEnd: sunday.getTime(),
  };
};

export const getCurrentYear = (): number => {
  const year = new Date().getFullYear();
  return year;
};
