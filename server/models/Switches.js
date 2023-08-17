import { Schema, model } from "mongoose";

const switchSchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  product: {
    type: String,
    required: true,
    trim: true,
  },
  switchType: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageURL: {
    type: String,
    trim: true,
  },
});

const Switch = model("Switches", switchSchema);

export default Switch;
