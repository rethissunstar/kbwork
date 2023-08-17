import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const sendVerificationEmail = async ({ email }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: process.env.TESTMAIL,
      pass: process.env.TESTPASS,
    },
  });

  // Set the current URL based on the environment
  const currentUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
  const uniqueString = uuid();

  const mailOptions = {
    from: process.env.TESTMAIL,
    to: email,
    subject: "Verify your Email for KB-Fanatics",
    html: `<p>Verify your email address to complete your Account</p>
       <p>This link expires in 1 hour</p>
       <a href="${currentUrl}/user/verify/${uniqueString}">Click here to verify</a>`,
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
