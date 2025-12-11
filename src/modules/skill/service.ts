import {
  getDailyScheduleKey,
  getWeeklyScheduleKey,
  parseUserDate,
  validatePayload,
} from "../../services/utils.service";
import { TaskModel } from "../task/model";
import { TaskService } from "../task/service";
import { Task, TaskType } from "../task/types";
import { TaskHistoryModel } from "../taskHistory/model";
import { TaskHistoryService } from "../taskHistory/service";
import { TaskHistory } from "../taskHistory/types";
import { UploadController } from "../upload/controller";
import { SkillModel } from "./model";
import { Skill, SkillPayload, SkillSchema } from "./types";

export class SkillService {
  private taskService = new TaskService();
  private uploadController = new UploadController();
  private taskHistoryService = new TaskHistoryService();

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

  public async getSkills(userId: string, dailyKey: string) {
    try {
      const date = parseUserDate(dailyKey);
      const dayKey = getDailyScheduleKey(date);
      const weekKey = getWeeklyScheduleKey(date);

      const [skills, tasks, taskHistories] = await Promise.all([
        SkillModel.find({ user: userId })
          .select({
            updatedAt: 0,
            createdAt: 0,
            user: 0,
            fileType: 0,
            public_id: 0,
          })
          .lean(),
        TaskModel.find({ user: userId })
          .select({
            skill: 1,
          })
          .lean(),
        TaskHistoryModel.find({
          user: userId,
          $or: [{ scheduleKey: { $in: [dayKey, weekKey] } }, { type: TaskType.ONE_TIME }],
        }).select({
          skill: 1,
          task: 1,
        }),
      ]);

      return this.attachTaskCountsToSkills(skills, tasks, taskHistories);
    } catch (error) {
      throw error;
    }
  }

  public getSkill(skillId: string, userId: string) {
    return SkillModel.findOne({ _id: skillId, user: userId }).select({
      updatedAt: 0,
    });
  }

  public getTasksBySkill(skillId: string, userId: string) {
    return this.taskService.getTasks(skillId, userId);
  }

  public getTaskHistoryBySkill(skillId: string, userId: string, dailyKey: string) {
    return this.taskHistoryService.getTaskHistory(skillId, userId, dailyKey);
  }

  public async deleteSkill(skillId: string, public_id: string) {
    try {
      await this.uploadController.deleteFileHelper(public_id);
      await this.taskService.deleteTasks(skillId);

      return SkillModel.findByIdAndDelete(skillId);
    } catch (error) {
      throw error;
    }
  }

  public updateSkill(skillId: string, skillPayload: Partial<SkillPayload>) {
    return SkillModel.findByIdAndUpdate(skillId, skillPayload, { new: true });
  }

  private attachTaskCountsToSkills(skills: Skill[], tasks: Task[], taskHistories: TaskHistory[]) {
    // Count total tasks by skillId
    const totalTaskMap: Record<string, number> = {};
    tasks.forEach((t) => {
      totalTaskMap[t.skill!.toString()] = (totalTaskMap[t.skill!.toString()] || 0) + 1;
    });

    // Count completed tasks by skillId
    const completedTaskMap: Record<string, number> = {};
    taskHistories.forEach((th) => {
      completedTaskMap[th.skill!.toString()] = (completedTaskMap[th.skill!.toString()] || 0) + 1;
    });

    // Attach counts to skills
    return skills.map((skill) => ({
      ...skill,
      totalTasks: totalTaskMap[skill._id!.toString()] || 0,
      completedTasks: completedTaskMap[skill._id!.toString()] || 0,
    }));
  }
}
