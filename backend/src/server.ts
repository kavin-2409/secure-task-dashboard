import dotenv from "dotenv";
dotenv.config();

import taskRoutes from "./routes/task.routes";
import express from "express";
import cors from "cors";
//import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

const PORT = 4000;

// IMPORTANT — database must connect first
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});