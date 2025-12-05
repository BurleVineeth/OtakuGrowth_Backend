import { Router } from "express";
import { Routes } from "../../constants";
import { TaskHistoryController } from "./controller";

const router = Router();
const controller = new TaskHistoryController();

router.post(`/${Routes.COMPLETE_TASK}`, controller.completeTask.bind(controller));

export default router;
