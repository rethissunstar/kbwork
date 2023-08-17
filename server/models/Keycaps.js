import { Schema, model } from "mongoose";

const keycapSchema = new Schema({
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
  model: {
    type: String,
    required: true,
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

const Keycap = model("Keycap", keycapSchema);

export default Keycap;
