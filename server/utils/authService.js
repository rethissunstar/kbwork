import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const generateToken = (user) => {
  try {
    return jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (error) {
    console.log("JWT Secret:", process.env.JWT_SECRET);

    throw new Error("Error generating token.");
  }
};

export const verifyTokenFunction = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    return await User.findById(userId);
  } catch (error) {
    return null;
  }
};
