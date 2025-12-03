import { Router } from "express";
import { userRoutes } from "../modules/user";
import { authRoutes } from "../modules/auth";
import { uploadRoutes } from "../modules/upload";
import { skillRoutes } from "../modules/skill";

const router = Router();

router.get("/", (req, res) => {
  res.send("API root working");
});

router.use(userRoutes);
router.use(authRoutes);
router.use(uploadRoutes);
router.use(skillRoutes);

export default router;
