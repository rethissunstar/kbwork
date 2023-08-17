import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newRefundAdded: false,
};

const refundSlice = createSlice({
  name: "refunds",
  initialState,
  reducers: {
    toggleNewRefundAdded: (state) => {
      state.newRefundAdded = !state.newRefundAdded;
    },
    resetNewRefundFlag: (state) => {
      state.newRefundAdded = false;
    },
  },
});

export const { toggleNewRefundAdded, resetNewRefundFlag } = refundSlice.actions;

export default refundSlice.reducer;
