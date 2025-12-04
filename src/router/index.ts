import { Router } from "express";
import { userRoutes } from "../modules/user";
import { authRoutes } from "../modules/auth";
import { uploadRoutes } from "../modules/upload";
import { skillRoutes } from "../modules/skill";
import { taskRoutes } from "../modules/task";

const router = Router();

router.get("/", (req, res) => {
  res.send("API root working");
});

router.use(userRoutes);
router.use(authRoutes);
router.use(uploadRoutes);
router.use(skillRoutes);
router.use(taskRoutes);

export default router;
