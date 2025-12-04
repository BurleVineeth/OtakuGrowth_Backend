import { Router } from "express";
import { Routes } from "../../constants";
import { SkillController } from "./controller";

const router = Router();
const controller = new SkillController();

router.get(`/${Routes.GET_SKILLS}/:userId`, controller.getSkills.bind(controller));
router.get(`/${Routes.SINGLE_SKILL}`, controller.getSingleSkill.bind(controller));
router.get(`/${Routes.SKILL}/:skillId`, controller.getSkill.bind(controller));

router.post(`/${Routes.ADD_SKILL}`, controller.addSkill.bind(controller));

router.put(`/${Routes.UPDATE_SKILL}`, controller.updateSkill.bind(controller));

router.delete(`/${Routes.DELETE_SKILL}`, controller.deleteSkill.bind(controller));

export default router;
