import {
  Switch,
  Keyboard,
  Keycap,
  Deskmat,
  Accessory,
  User,
  Order,
  UserVerification,
} from "../models/index.js";
import bcrypt from "bcrypt";
import Stripe from "stripe";
import { generateToken, verifyTokenFunction } from "../utils/authService.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const resolvers = {
  Query: {
    user: async (_, { _id }) => {
      try {
        const foundUser = await User.findById(_id);
        if (!foundUser) {
          throw new Error("User not found");
        }
        return foundUser;
      } catch (error) {
        throw new Error("Error fetching user");
      }
    },
    getUserOrders: async (_, { _id }) => {
      try {
        const foundOrders = await Order.find({ user: _id });
        if (!foundOrders.length) {
          return [];
        }
        return foundOrders;
      } catch (error) {
        throw new Error("Error fetching orders");
      }
    },
    getSingleOrder: async (_, { _id }) => {
      return await Order.findById(_id);
    },
    switches: async () => {
      try {
        return await Switch.find({});
      } catch (error) {
        throw new Error("Error fetching switches");
      }
    },
    keyboards: async () => {
      try {
        return await Keyboard.find({});
      } catch (error) {
        throw new Error("Error fetching keyboards");
      }
    },
    keycaps: async () => {
      try {
        return await Keycap.find({});
      } catch (error) {
        throw new Error("Error fetching keycaps");
      }
    },
    deskmats: async () => {
      try {
        return await Deskmat.find({});
      } catch (error) {
        throw new Error("Error fetching deskmats");
      }
    },
    accessories: async () => {
      try {
        return await Accessory.find({});
      } catch (error) {
        throw new Error("Error fetching accessories");
      }
    },
    verifyToken: async (_, { token }) => {
      const user = await verifyTokenFunction(token);

      if (!user) {
        throw new Error("Invalid or expired token.");
      }

      return user;
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      try {
        const existingUser = await User.findOne({ email: input.email });
        if (existingUser) {
          throw new Error("Email is already in use");
        }
        // Salt & hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(input.password, saltRounds);

        // Replace plain password with hashed one
        input.password = hashedPassword;

        const emailResult = await sendVerificationEmail({ email: input.email });
        if (emailResult.success && emailResult.uniqueString) {
          const now = new Date();
          const expiryTime = new Date(now.getTime() + 1 * 60 * 60 * 1000); // 1 hour from now

          const userVerificationEntry = new UserVerification({
            email: input.email,
            uniqueString: emailResult.uniqueString,
            createdAt: now,
            expiresAt: expiryTime,
          });

          await userVerificationEntry.save();
        } else {
          console.log(
            "There was no response from this email or verification token was not generated",
          );
        }

        const newUser = new User(input);
        return await newUser.save();
      } catch (error) {
        throw new Error(error.message || "Error signing up the user");
      }
    },
    verifyEmail: async (_, { uniqueString }) => {
      //
      const verificationRecord = await UserVerification.findOne({ uniqueString });
      console.log(verificationRecord);

      // Check if verification record exists
      if (!verificationRecord) {
        throw new Error("Invalid or expired verification link");
      }

      // Check if verification link has expired
      const now = new Date();
      if (verificationRecord.expiresAt < now) {
        throw new Error("Verification link has expired. Please request a new one.");
      }

      // Update user record
      const user = await User.findOne({ email: verificationRecord.email });
      user.verified = true;
      await user.save();

      // Delete verification record
      await UserVerification.deleteOne({ uniqueString });

      // Return success message
      return { success: true, message: "Email verified successfully!" };
    },
    emailCheck: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      await sendPasswordResetEmail({ email });
      return { success: true };
    },
    resetPassword: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      console.log(user);
      // Salt & hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Replace plain password with hashed one
      const newPassword = hashedPassword;

      user.password = newPassword;
      await user.save();
      return { success: true, message: "Password updated successfully" };
    },
    resendVerificationEmail: async (_, { email }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.verified) {
        throw new Error("Email is already verified");
      }

      await sendVerificationEmail({ email });

      return { success: true, message: "Verification email sent!" };
    },
    login: async (_, { email, password }) => {
      try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        // Check if password is correct
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // Check if user has verified their email address
        if (!user.verified) {
          throw new Error("Please verify your email address before logging in.");
        }

        // Generate JWT token
        const tokenData = { id: user._id };
        const token = generateToken(tokenData);

        // Remove password from user object
        user.password = undefined;

        // Return token and user data
        return {
          token,
          user,
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    createPaymentIntent: async (_, { amount }) => {
      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount, // Amount is in cents
          currency: "usd",
        });
        return { success: true, clientSecret: paymentIntent.client_secret };
      } catch (error) {
        console.log("error", error);
        return { success: false, error: error.message };
      }
    },
    createOrder: async (_, { input }) => {
      try {
        // Fetch user to associate with the order
        const user = await User.findById(input.user);
        if (!user) {
          throw new Error("User not found");
        }

        // Prepare order data
        const orderData = {
          orderTotal: input.total,
          orderItems: input.items,
          user: input.user,
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          shippingAddress: input.shippingAddress,
          orderSubTotal: input.subTotal,
          orderTax: input.tax,
        };

        // Create a new order
        const newOrder = new Order(orderData);
        const savedOrder = await newOrder.save();

        return savedOrder;
      } catch (error) {
        throw new Error(error.message || "Error creating the order");
      }
    },
    createRefund: async (_, { email, refundReason }) => {
      try {
        const newRefunds = new Refunds({ email, refundReason });
        const saveRefund = await newRefunds.save();

        return saveRefund;
      } catch (error) {
        console.log("error", error);
        return { success: false, error: error.message };
      }
    },
  },
};
export default resolvers;
