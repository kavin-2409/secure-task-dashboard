import { validateCreateTask } from "../validators/task.validator";
import { validateRequest } from "../validators/validateRequest";
import express from "express";
import { createTask,getTasks,updateTask,deleteTask } from "../controllers/task.controller";
import { protect } from "../middleware/auth.middleware";
import { validateUpdateTask } from "../validators/task.validator";
import { asyncHandler } from "../utils/asyncHandler";

const router = express.Router();

router.get("/", protect, asyncHandler(getTasks));

router.post(
  "/",
  protect,
  validateCreateTask,
  validateRequest,
  asyncHandler(createTask)
);

router.put(
  "/:id",
  protect,
  validateUpdateTask,
  validateRequest,
  asyncHandler(updateTask)
);

router.delete("/:id", protect, asyncHandler(deleteTask));

export default router;