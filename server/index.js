import { connectDB } from "./config/database.js";
import studentRoutes from "./routes/studentRoutes.js";
import express from "express";
import dotenv from "dotenv";
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MySQL database
await connectDB();

app.use(express.json());

// Define routes
app.use("/api/students", studentRoutes );

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});