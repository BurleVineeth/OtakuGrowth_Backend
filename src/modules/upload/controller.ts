import { Request, Response } from "express";
import cloudinary from "../../core/config/cloudinary";

export class UploadController {
  public async upload(req: Request, res: Response) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      res.status(201).json({
        success: true,
        data: {
          url: req.file.path,
          public_id: req.file.filename,
          fileType: req.file.mimetype,
        },
        message: "Uploaded Successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: (error as Error).message,
        status: 500,
      });
    }
  }

  public async deleteFile(req: Request, res: Response) {
    try {
      const { public_id } = req.body;

      await this.deleteFileHelper(public_id);

      return res.json({
        success: true,
        message: "File deleted successfully",
      });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ message: "Delete failed" });
    }
  }

  public deleteFileHelper(public_id: string) {
    if (!public_id) {
      throw new Error("public_id is required");
    }

    return cloudinary.uploader.destroy(public_id);
  }

  public async replaceFile(req: Request, res: Response) {
    try {
      const { old_public_id } = req.body;

      // Delete old file from Cloudinary if provided
      if (old_public_id) {
        await cloudinary.uploader.destroy(old_public_id);
      }

      // New uploaded file info (Cloudinary returns this via multer-storage-cloudinary)
      return res.json({
        success: true,
        data: {
          url: req.file?.path ?? "",
          public_id: req.file?.filename ?? "",
          fileType: req.file?.mimetype ?? "",
        },
        message: "File replaced successfully",
      });
    } catch (err) {
      console.error("Replace error:", err);
      res.status(500).json({ message: "Replace failed" });
    }
  }
}
