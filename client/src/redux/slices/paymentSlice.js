import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  loading: false,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    // 🔄 set all payments
    setPayments: (state, action) => {
      state.payments = action.payload;
    },

    // ➕ add new payment
    addPayment: (state, action) => {
      state.payments.unshift(action.payload);
    },

    // 🔄 update payment status (approve/reject)
    updatePaymentStatus: (state, action) => {
      const { id, status } = action.payload;

      const payment = state.payments.find((p) => p._id === id);
      if (payment) {
        payment.status = status;
      }
    },

    // ❌ delete payment (UI only)
    deletePayment: (state, action) => {
      state.payments = state.payments.filter((p) => p._id !== action.payload);
    },

    // 📌 select payment
    setSelectedPayment: (state, action) => {
      state.selectedPayment = action.payload;
    },

    // ⏳ loading
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    // ❗ error
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPayments,
  addPayment,
  updatePaymentStatus,
  deletePayment,
  setSelectedPayment,
  setLoading,
  setError,
} = paymentSlice.actions;

export default paymentSlice.reducer;
