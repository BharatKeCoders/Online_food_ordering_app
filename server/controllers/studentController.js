import OTP from "../models/OTP.js";
import Student from "../models/Student.js";
import crypto from "crypto";

// sending otp
export const sendOTP= async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // check if user exists
        const find = await Student.findOne({ email });
        if (find) {
            return res.status(400).json({ message: "User already exists" });
        }

        // generate otp
        const timestamp = Date.now().toString();
        const randomNum = crypto.randomInt(100000, 999999).toString();
        const otp = (parseInt(timestamp.slice(-4)) + parseInt(randomNum)).toString().slice(-6);
        console.log("otp : ", otp);

        // save otp
        const otpBody = await OTP.create({ email, otp });
        console.log("otpBody : ", otpBody);
        res.status(200).json({ message: "OTP sent successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new student
export const createStudent = async (req, res) => {
    try {
        console.log("jai shankar ki");
        const { student_id, firstName, lastName, email, phoneNo, balance, password, otp } = req.body;
        if (!student_id || !firstName || !lastName || !email || !phoneNo || !balance || !password || !otp) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Use `await` and define `where` clause correctly
        const findOtp = await OTP.findOne({ where: { email, otp } });
        if (!findOtp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        // Delete OTP
        await OTP.destroy({
            where: { email, otp }
        });

        const student = await Student.create({ student_id, firstName, lastName, email, phoneNo, balance, password });
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Get all students
export const getAllStudents = async (req, res) => {
    try {
        const students = await Student.findAll();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a student by ID
export const getStudentById = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a student by ID
export const updateStudent = async (req, res) => {
    try {
        const { student_id } = req.params;
        const { firstName, lastName, email, phoneNo, balance,password } = req.body;
        const student = await Student.findByPk(student_id);
        if (!student) return res.status(404).json({ message: "Student not found" });
        
        student.student_id = student_id;
        student.firstName = firstName;
        student.lastName = lastName;
        student.email = email;
        student.phoneNo = phoneNo;
        student.balance = balance;
        student.password = password;

        await student.save();
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a student by ID
export const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Student.findByPk(id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        await student.destroy();
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
