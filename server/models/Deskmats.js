import { Schema, model } from "mongoose";

const deskmatSchema = new Schema({
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

const Deskmat = model("Deskmat", deskmatSchema);

export default Deskmat;
