import { Schema, model } from "mongoose";

const keyboardSchema = new Schema({
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  model: {
    type: String,
    required: true,
    trim: true,
  },
  color: {
    type: String,
    trim: true,
  },
  keycaps: {
    type: String,
    trim: true,
  },
  plate: {
    type: String,
    trim: true,
  },
  case: {
    type: String,
    trim: true,
  },
  switches: {
    type: String,
    trim: true,
  },
  hotswap: {
    type: Boolean,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    trim: true,
  },
});

const Keyboard = model("Keyboard", keyboardSchema);

export default Keyboard;
