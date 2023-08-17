/* eslint-disable arrow-body-style */
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.findIndex((item) => item._id === action.payload._id);
      if (itemIndex >= 0) {
        // If the item already exists, increment the quantity
        state[itemIndex].quantity += 1;
      } else {
        // Otherwise add a new item to the cart
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      // Filter out the item with the matching id and return the new state
      return state.filter((item) => item._id !== action.payload);
    },
    updateQuantity: (state, action) => {
      // Find the item and update the quantity
      // eslint-disable-next-line no-shadow
      const item = state.find((item) => item._id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: () => {
      // Clear the cart
      return [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
