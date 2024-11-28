import express from 'express';
import cors from 'cors';
import imageRoutes from "./routes/imageRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticateToken } from './middlewares/authMiddleware';

const app = express();

// Enable CORS for frontend requests
app.use(cors({
    origin: 'http://localhost:3000', // Your frontend URL
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes - ensure authenticateToken is applied to all image routes
app.use("/api/images", authenticateToken);  // Add authentication middleware first
app.use("/api/images", imageRoutes);       // Then add the routes

export default app;
