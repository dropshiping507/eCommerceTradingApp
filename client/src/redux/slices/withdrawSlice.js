import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  withdrawals: [],
  loading: false,
};

const withdrawSlice = createSlice({
  name: "withdrawals",
  initialState,
  reducers: {
    // 📥 set all withdrawals
    setWithdrawals: (state, action) => {
      state.withdrawals = action.payload;
    },

    // ➕ add new withdrawal request
    addWithdrawal: (state, action) => {
      state.withdrawals.unshift(action.payload);
    },

    // 🔄 update status (approved / rejected / pending)
    updateWithdrawalStatus: (state, action) => {
      const { id, status } = action.payload;

      const withdrawal = state.withdrawals.find((w) => w._id === id);
      if (withdrawal) {
        withdrawal.status = status;
      }
    },

    // ❌ delete withdrawal (admin or user UI)
    deleteWithdrawal: (state, action) => {
      state.withdrawals = state.withdrawals.filter(
        (w) => w._id !== action.payload,
      );
    },

    // 📌 select withdrawal
    setSelectedWithdrawal: (state, action) => {
      state.selectedWithdrawal = action.payload;
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
  setWithdrawals,
  addWithdrawal,
  updateWithdrawalStatus,
  deleteWithdrawal,
  setSelectedWithdrawal,
  setLoading,
  setError,
} = withdrawSlice.actions;

export default withdrawSlice.reducer;
