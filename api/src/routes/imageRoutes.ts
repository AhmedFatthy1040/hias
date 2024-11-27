import { Router } from "express";
import { ImageController } from "../controllers/imageController";
import { upload } from "../middlewares/multerConfig";
import { ImageService } from "../services/imageService";

const router = Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    await ImageController.uploadImage(req, res); // Await the async controller method
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

// In your imageRoutes.ts
router.get("/", async (req, res) => {
  try {
      const images = await ImageService.getAllImages(); // Implement this method in your ImageService
      res.status(200).json(images);
  } catch (error) {
      res.status(500).json({ message: "Error fetching images", error: error });
  }
});

export default router;