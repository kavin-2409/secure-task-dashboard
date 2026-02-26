import { Request, Response } from "express";
import Task from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    // get logged-in user id from middleware
    const userId = (req as any).user.id;

    const task = await Task.create({
      title,
      description,
      user: userId,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to create task" });
  }
};
export const getTasks = async (req: Request, res: Response) => {
  try {
    // get logged-in user id from JWT middleware
    const userId = (req as any).user.id;

    // find only tasks belonging to this user
    const tasks = await Task.find({ user: userId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
};
export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // IMPORTANT SECURITY CHECK
    if (task.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to update this task" });
    }

    const { title, description, completed } = req.body;

    task.title = title ?? task.title;
    task.description = description ?? task.description;
    task.completed = completed ?? task.completed;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update task" });
  }
};
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const taskId = req.params.id;

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // ownership check
    if (task.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    await task.deleteOne();

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
};