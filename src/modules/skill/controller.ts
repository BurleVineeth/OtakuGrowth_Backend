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
}
