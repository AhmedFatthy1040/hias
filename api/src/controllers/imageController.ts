import { Request, Response } from "express";
import { ImageService } from "../services/imageService";
import path from "path";

export class ImageController {

  static async uploadImage(req: Request, res: Response): Promise<Response> {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const imagePath = path.join("uploads", req.file.filename);
      const imageMetadata = await ImageService.uploadImage(req.file.filename, imagePath);

      return res.status(201).json({
        message: "Image uploaded successfully",
        image: imageMetadata,
      });
    } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(500).json({ message: "Error uploading image", error: error.message });
        } else {
          return res.status(500).json({ message: "Unknown error occurred during image upload" });
        }
      }
  }
}
