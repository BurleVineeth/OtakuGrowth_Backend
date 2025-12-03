import z from "zod";

export type SkillPayload = {
  name: string;
  level: string;
};

export enum SkillDifficulty {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export const SkillSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().min(10).max(300),
  category: z.string().max(50),
  difficulty: z.enum([
    SkillDifficulty.BEGINNER,
    SkillDifficulty.INTERMEDIATE,
    SkillDifficulty.ADVANCED,
  ]),
  url: z.string(),
  public_id: z.string(),
  fileType: z.string(),
});
