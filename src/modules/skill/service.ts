import { validatePayload } from "../../services/utils.service";
import { TaskService } from "../task/service";
import { SkillModel } from "./model";
import { SkillPayload, SkillSchema } from "./types";

export class SkillService {
  private taskService = new TaskService();
  public async addSkill(skillPayload: SkillPayload) {
    try {
      const validation = validatePayload<SkillPayload>(SkillSchema, skillPayload);
      if (!validation.success) {
        throw new Error(validation.errors.join(", "));
      }

      const skill = await SkillModel.create(skillPayload);
      return skill;
    } catch (error) {
      throw error;
    }
  }

  public getSkills(userId: string) {
    return SkillModel.find({ user: userId }).select({
      updatedAt: 0,
      createdAt: 0,
      user: 0,
      fileType: 0,
      public_id: 0,
    });
  }

  public getSkill(skillId: string, userId: string) {
    return SkillModel.findOne({ _id: skillId, user: userId }).select({
      updatedAt: 0,
    });
  }

  public getTasksBySkill(skillId: string, userId: string) {
    return this.taskService.getTasks(skillId, userId);
  }
}
