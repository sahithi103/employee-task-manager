import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

const router = express.Router();

// CREATE employee
router.post("/", createEmployee);

// READ all employees
router.get("/", getEmployees);

// READ single employee
router.get("/:id", getEmployeeById);

// UPDATE employee
router.put("/:id", updateEmployee);

// DELETE employee
router.delete("/:id", deleteEmployee);

export default router;
