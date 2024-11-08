// import mysql from "mysql2/promise";
// import dotenv from "dotenv";
// dotenv.config();

// const connectDB = async () => {
//     try {
//         const conn = await mysql.createConnection({
//             host: process.env.DB_HOST,
//             user: process.env.DB_USER,
//             password: process.env.DB_PASS,
//             database: process.env.DB_NAME
//         });

//         console.log(`MySQL Connected: ${conn.config.host}`);
//     } catch (error) {
//         console.error(`Error: ${error.message}`);
//         process.exit(1);
//     }
// };

// export default connectDB;
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Initialize Sequelize instance
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: console.log, // Enable query logging in the console
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL Connected successfully.");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit with failure
    }
};

export { sequelize, connectDB };
