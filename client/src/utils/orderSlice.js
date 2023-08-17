import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newOrderAdded: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    toggleNewOrderAdded: (state) => {
      state.newOrderAdded = !state.newOrderAdded;
    },
    resetNewOrderFlag: (state) => {
      state.newOrderAdded = false;
    },
  },
});

export const { toggleNewOrderAdded, resetNewOrderFlag } = orderSlice.actions;

export default orderSlice.reducer;
