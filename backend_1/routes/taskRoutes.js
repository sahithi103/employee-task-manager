import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByEmployee,
} from "../controllers/taskController.js";

const router = express.Router();

// CREATE a task
router.post("/", createTask);

// READ all tasks
router.get("/", getTasks);

// READ a single task
router.get("/:id", getTaskById);

// UPDATE a task
router.put("/:id", updateTask);

// DELETE a task
router.delete("/:id", deleteTask);

// GET tasks assigned to a specific employee
router.get("/employee/:employeeId", getTasksByEmployee);

export default router;
