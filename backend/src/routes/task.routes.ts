import express from "express";
import { createTask,getTasks,updateTask,deleteTask } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";


const router = express.Router();

// create task (protected route)
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

export default router;