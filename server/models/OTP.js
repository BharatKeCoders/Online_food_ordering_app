import { DataTypes } from "sequelize";
import {sequelize} from "../config/database.js";
import transporter from "../config/emailConfig.js";

const OTP = sequelize.define("OTP", {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    otp: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    hooks: {
        beforeCreate: async (otp) => {
            const email = otp.email;
            try {
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Your OTP Code',
                    text: `Your OTP code is ${otp.otp}. It will expire in 5 minutes.`
                });
            } catch (error) {
                console.log(error.message);
                throw new Error("Error in sending email");
            }
        }
    }
});

OTP.findOneByEmail = async function(email) {
    try {
        return await OTP.findOne({ where: { email } });
    } catch (error) {
        console.log(error.message);
        throw new Error("Error in finding OTP by email");
    }
};

export default OTP;