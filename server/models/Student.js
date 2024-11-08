import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import bcrypt from 'bcrypt';

const Student = sequelize.define("Student", {
    student_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            is: /^[A-Za-z0-9]{11}$/
        }
    },
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        trim: true
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        trim: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        trim: true
    },
    phoneNo: {
        type: DataTypes.STRING(15),
        allowNull: true,
        trim: true
    },
    balance: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(value, salt);
            this.setDataValue('password', hash);
        }
    }
}, {
    tableName: "students",
    timestamps: true
});

export default Student;
