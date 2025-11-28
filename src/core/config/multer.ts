import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "myapp/uploads",
    resource_type: "auto",

    transformation: [{ width: 1600, crop: "limit" }, { quality: "auto" }, { fetch_format: "auto" }],
  }),
});

const upload = multer({ storage });

export default upload;
