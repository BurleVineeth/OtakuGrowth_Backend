import { Router } from "express";
import { Routes } from "../../constants";
import { SkillController } from "./controller";

const router = Router();
const controller = new SkillController();

router.post(`/${Routes.ADD_SKILL}`, controller.addSkill.bind(controller));

export default router;
