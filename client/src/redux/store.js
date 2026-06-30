import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import membersReducer from "./slices/memberSlice.js";
import ordersReducer from "./slices/orderSlice.js";
import injectionReducer from "./slices/injectionSlice.js";
import withdrawalsReducer from "./slices/withdrawSlice.js";
import paymentReducer from "./slices/paymentSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    injections: injectionReducer,
    members: membersReducer,
    orders: ordersReducer,
    payments: paymentReducer,
    withdrawals: withdrawalsReducer,
  },
});
