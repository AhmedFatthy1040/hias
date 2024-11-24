import { Router } from "express";
import { ImageController } from "../controllers/imageController";
import { upload } from "../middlewares/multerConfig";

const router = Router();

router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    await ImageController.uploadImage(req, res); // Await the async controller method
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;