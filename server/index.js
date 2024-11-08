import connectDB from "./config/database.js";
import express from "express";

const app = express();

await connectDB();

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});