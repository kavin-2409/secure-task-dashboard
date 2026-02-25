import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

const PORT = 4000;

// IMPORTANT — database must connect first
connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});