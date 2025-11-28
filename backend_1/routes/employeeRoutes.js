import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE employee (protected)
router.post("/", protect, createEmployee);

// READ all employees
router.get("/", getEmployees);

// READ single employee
router.get("/:id", getEmployeeById);

// UPDATE employee (protected)
router.put("/:id", protect, updateEmployee);

// DELETE employee (protected)
router.delete("/:id", protect, deleteEmployee);

export default router;
