import { Schema, model } from "mongoose";
const refundSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
    required: true,
    unique: true,
    trim: true,
  },

  refundReason: {
    type: String,
    required: true,
  },
});



const Refunds = model("Refunds", refundSchema);

export default Refunds;
