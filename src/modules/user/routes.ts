import { Router } from "express";
import { Routes } from "../../constants";
import { UsersController } from "./controller";

const router = Router();
const controller = new UsersController();

router.get(`/${Routes.USERS}`, controller.getAllUsers.bind(controller));
router.post(`/${Routes.CREATE_USER}`, controller.createUser.bind(controller));

router.get(`/${Routes.USER}`, controller.getUser.bind(controller));
router.post(`/${Routes.UPDATE_USER}`, controller.updateUser.bind(controller));
router.post(`/${Routes.UPDATE_USER_LEVEL}`, controller.updateUserLevel.bind(controller));

export default router;
