import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByEmployee,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE a task (protected)
router.post("/", protect, createTask);

// READ all tasks
router.get("/", getTasks);

// READ a single task
router.get("/:id", getTaskById);

// UPDATE a task (protected)
router.put("/:id", protect, updateTask);

// DELETE a task (protected)
router.delete("/:id", protect, deleteTask);

// GET tasks assigned to a specific employee
router.get("/employee/:employeeId", getTasksByEmployee);

export default router;
