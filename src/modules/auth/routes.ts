import { Router } from "express";
import { Routes } from "../../constants/routes";
import { AuthController } from "./controller";

const router = Router();
const controller = new AuthController();

router.post(`/${Routes.LOGIN}`, controller.login.bind(controller));
router.post(`/${Routes.REFRESH}`, controller.refresh.bind(controller));

export default router;
