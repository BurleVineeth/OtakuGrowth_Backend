import { Router } from "express";
import { Routes } from "../../constants";
import { UploadController } from "./controller";
import upload from "../../core/config/multer";

const router = Router();
const controller = new UploadController();

router.post(`/${Routes.UPLOAD}`, upload.single("file"), controller.upload.bind(controller));
router.post(`/${Routes.DELETE_FILE}`, controller.deleteFile.bind(controller));
router.post(
  `/${Routes.REPLACE_FILE}`,
  upload.single("file"),
  controller.replaceFile.bind(controller)
);

export default router;
