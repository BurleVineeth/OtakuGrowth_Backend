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
      const { dailyKey } = req.query;
      if (!userId) {
        throw new Error("User ID is required");
      }

      if (!dailyKey) {
        throw new Error("Daily key is required");
      }

      const skills = await this.skillService.getSkills(userId, dailyKey as string);

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
      const { userId, dailyKey } = req.query;

      if (!skillId) throw new Error("Skill ID is required");
      if (!userId) throw new Error("User ID is required");
      if (!dailyKey) throw new Error("Daily Key is required");

      // Fetch data in parallel
      const [skill, tasksRaw, tasksHistoryRaw] = await Promise.all([
        this.skillService.getSkill(skillId, userId as string),
        this.skillService.getTasksBySkill(skillId, userId as string),
        this.skillService.getTaskHistoryBySkill(skillId, userId as string, dailyKey as string),
      ]);

      // Normalize taskHistory -> Map<taskId, historyObj>
      const taskHistoryMap = new Map(
        tasksHistoryRaw.map((h) => {
          const hist = h.toObject ? h.toObject() : h;
          const taskId = hist.task?.toString(); // always string!
          return [taskId, hist];
        })
      );

      // Transform tasks
      const tasks = tasksRaw.map((t) => {
        const task = t.toObject ? t.toObject() : t;
        const taskId = task._id?.toString();

        return {
          ...task,
          _id: taskId,
          completed: taskHistoryMap.has(taskId),
        };
      });

      return res.status(200).json({
        success: true,
        data: { skill, tasks },
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

  public async deleteSkill(req: Request, res: Response) {
    try {
      const { skillId } = req.params;
      const { public_id } = req.query;
      if (!skillId) {
        throw new Error("Skill ID is required");
      }

      if (!public_id) {
        throw new Error("Public Id is required");
      }

      await this.skillService.deleteSkill(skillId, public_id as string);
      res.status(200).json({
        success: true,
        message: "Skill deleted successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: (error as Error).message,
        status: 400,
      });
    }
  }

  public async getSingleSkill(req: Request, res: Response) {
    try {
      const { skillId } = req.params;
      const { userId } = req.query;
      if (!skillId) {
        throw new Error("Skill ID is required");
      }

      if (!userId) {
        throw new Error("User ID is required");
      }

      const skill = await this.skillService.getSkill(skillId, userId as string);

      res.status(200).json({
        success: true,
        data: {
          skill,
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

  public async updateSkill(req: Request, res: Response) {
    try {
      const { skillId } = req.params;
      const skillPayload = req.body;
      if (!skillId) {
        throw new Error("Skill ID is required");
      }

      const skill = await this.skillService.updateSkill(skillId, skillPayload);

      res.status(200).json({
        success: true,
        data: {
          skill,
        },
        message: "Skill updated successfully",
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
