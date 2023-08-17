import db from "../config/connection.js";
import { Switch, Keyboard, Keycap, User, Deskmat, Accessory, Order, UserVerification } from "../models/index.js"; // Import all models
import switchData from "./switchData.json" assert { type: "json" };
import keyboardData from "./keyboardData.json" assert { type: "json" };
import keycapsData from "./keycapsData.json" assert { type: "json" };
import deskmatData from "./deskmatData.json" assert { type: "json" };
import accessoryData from "./accessoryData.json" assert { type: "json" };
import userData from "./userData.json" assert { type: "json" };
import orderData from "./orderData.json" assert { type: "json" };
import userVerification from "./userVerificationData.json" assert {type: "json"};
import bcrypt from "bcrypt";


db.once("open", async () => {
  try {
    await Promise.all([
      Switch.deleteMany({}),
      Keyboard.deleteMany({}),
      Keycap.deleteMany({}),
      Deskmat.deleteMany({}),
      Accessory.deleteMany({}),
      User.deleteMany({}),
      Order.deleteMany({}),
      UserVerification.deleteMany({}),
    ]);

    const hashedUserData = await Promise.all(
      userData.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);

        return {
          ...user,
          password: hashedPassword,
        };
      }),
    );

    await Promise.all([
      Switch.insertMany(switchData),
      Keyboard.insertMany(keyboardData),
      Keycap.insertMany(keycapsData),
      Deskmat.insertMany(deskmatData),
      Accessory.insertMany(accessoryData),
      User.insertMany(hashedUserData, { validateBeforeSave: false }),
      Order.insertMany(orderData),
      UserVerification.insertMany(userVerification),
    ]);

    console.log("Database seeded 🌱");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit(0);
  }
});
