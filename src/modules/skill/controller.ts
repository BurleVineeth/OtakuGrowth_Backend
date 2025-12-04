import { Request, Response } from "express";
import { SkillService } from "./service";

export class SkillController {
  private skillService = new SkillService();

  public async addSkill(req: Request, res: Response) {
    try {
      const response = await this.skillService.addSkill(req.body);

      res.status(200).json({
        success: true,
        data: {
          skill: response,
        },
        message: "Skill added successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async getSkills(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      if (!userId) {
        throw new Error("User ID is required");
      }

      const skills = await this.skillService.getSkills(userId);

      res.status(200).json({
        success: true,
        data: {
          skills,
        },
        message: "Skills retrieved successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async getSkill(req: Request, res: Response) {
    try {
      const { skillId } = req.params;
      if (!skillId) {
        throw new Error("Skill ID is required");
      }

      const [skill, tasks] = await Promise.all([
        this.skillService.getSkill(skillId),
        this.skillService.getTasksBySkill(skillId),
      ]);

      res.status(200).json({
        success: true,
        data: {
          skill,
          tasks,
        },
        message: "Skill retrieved successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }
}
