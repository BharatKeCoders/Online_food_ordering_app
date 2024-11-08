import express from "express";
import {
    sendOTP,
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";
import { sequelize } from "../config/database.js";

(async () => {
    try {
        await sequelize.sync({ alter: true });  // Use `alter: true` for development to sync tables
        console.log("Database synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing database:", error);
    }
})();

const router = express.Router();

// Create a new student
router.post("/", sendOTP);

// Create a new student
router.post("/create", createStudent);

// Get all students
router.get("/", getAllStudents);

// Get a student by ID
router.get("/:id", getStudentById);

// Update a student by ID
router.put("/:id", updateStudent);

// Delete a student by ID
router.delete("/:id", deleteStudent);

export default router;