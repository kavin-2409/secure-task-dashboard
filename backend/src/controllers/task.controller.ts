import { Request, Response } from "express";
import Task from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
 // throw new Error("Database exploded");
  const userId = (req as any).user.id;

  const task = await Task.create({
    ...req.body,
    user: userId,
  });

  res.status(201).json(task);
};
export const getTasks = async (req: Request, res: Response) => {
  
  const userId = (req as any).user.id;

  const tasks = await Task.find({ user: userId });

  res.json(tasks);
};
export const updateTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const taskId = req.params.id;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    req.body,
    { new: true }
  );

  if (!task) {
    throw new Error("Task not found");
  }

  res.json(task);
};
export const deleteTask = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const taskId = req.params.id;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  res.json({ message: "Task deleted successfully" });
};