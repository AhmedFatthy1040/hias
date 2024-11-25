import express from 'express';
import imageRoutes from "./routes/imageRoutes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/images", imageRoutes);

export default app;
