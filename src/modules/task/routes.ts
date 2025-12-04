import { Router } from "express";
import { Routes } from "../../constants";
import { TaskController } from "./controller";

const router = Router();
const controller = new TaskController();

router.post(`/${Routes.ADD_TASK}`, controller.addTask.bind(controller));
router.get(`/${Routes.TASKS}`, controller.getTasks.bind(controller));
router.put(`/${Routes.UPDATE_TASK}`, controller.updateTask.bind(controller));
router.delete(`/${Routes.DELETE_TASK}`, controller.deleteTask.bind(controller));

export default router;
