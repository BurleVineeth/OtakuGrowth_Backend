import { Router } from "express";
import { userRoutes } from "../modules/user";

const router = Router();

router.get("/", (req, res) => {
  res.send("API root working");
});

router.use(userRoutes);

export default router;
