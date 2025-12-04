import { Router } from "express";
import { Routes } from "../../constants";
import { TaskController } from "./controller";

const router = Router();
const controller = new TaskController();

router.post(`/${Routes.ADD_TASK}`, controller.addTask.bind(controller));

export default router;
