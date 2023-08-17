import { Schema, model } from "mongoose";

const UserVerificationSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    uniqueString: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

const UserVerification = model("UserVerification", UserVerificationSchema);

export default UserVerification;
