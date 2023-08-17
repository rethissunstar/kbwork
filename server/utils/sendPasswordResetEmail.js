import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const sendPasswordResetEmail = async ({ email }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.TESTMAIL,
      pass: process.env.TESTPASS,
    },
  });

  const currentUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
  const uniqueString = uuid();

  const mailOptions = {
    from: process.env.TESTMAIL,
    to: email,
    subject: "Password Reset for Your KB-Fanatics Account",
    html: `<p>You have requested to reset your password</p>
       <p>This link expires in 1 hour</p>
       <a href="${currentUrl}/reset-password/${uniqueString}/${email}">Click here to reset your password</a>`,
  };

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    return {
      success: true,
      uniqueString: uniqueString,
      response: emailResponse,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Error sending email");
  }
};
