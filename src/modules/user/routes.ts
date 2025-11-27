import { Router } from "express";
import { Routes } from "../../constants";
import { UsersController } from "./controller";

const router = Router();
const controller = new UsersController();

router.get(`/${Routes.USERS}`, controller.getAllUsers.bind(controller));
router.post(`/${Routes.USERS}`, controller.createUser.bind(controller));

router.get(`/${Routes.USER}`, controller.getUser.bind(controller));

export default router;
