import { Router } from "express";
import usersModule from "../modules/users";

const router = Router();

router.get("/", (req, res) => {
  res.send("API root working");
});

router.use(usersModule);

export default router;
