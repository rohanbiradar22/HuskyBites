import OrderState from "@/models/orderSummary";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: OrderState = {
  customTip: "",
  orderTotal: 0,
  tax: 0,
  delivery: 0,
  tipPercentage: 0,
};

// order slice for maintaining order state
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCustomTip: (state, action: PayloadAction<string>) => {
      state.customTip = action.payload;
    },
    setOrderTotal: (state, action: PayloadAction<number>) => {
      state.orderTotal = action.payload;
    },
    setTax: (state, action: PayloadAction<number>) => {
      state.tax = action.payload;
    },
    setDelivery: (state, action: PayloadAction<number>) => {
      state.delivery = action.payload;
    },
    setTipPercentage: (state, action: PayloadAction<number>) => {
      state.tipPercentage = action.payload;
    },
  },
});

export const {
  setCustomTip,
  setOrderTotal,
  setTax,
  setDelivery,
  setTipPercentage,
} = orderSlice.actions;

export default orderSlice.reducer;
