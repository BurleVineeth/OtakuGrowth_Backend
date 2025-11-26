import { Router } from "express";
import { userRoutes } from "../modules/user";
import { authRoutes } from "../modules/auth";

const router = Router();

router.get("/", (req, res) => {
  res.send("API root working");
});

router.use(userRoutes);
router.use(authRoutes);

export default router;
