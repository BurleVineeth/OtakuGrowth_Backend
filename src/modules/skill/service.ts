import { validatePayload } from "../../services/utils.service";
import { SkillModel } from "./model";
import { SkillPayload, SkillSchema } from "./types";

export class SkillService {
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

  public async getSkills(userId: string) {
    try {
      const skills = await SkillModel.find({ user: userId });
      return skills;
    } catch (error) {
      throw error;
    }
  }
}
