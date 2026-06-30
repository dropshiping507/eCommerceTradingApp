import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  members: [],
};
const memberSlice = createSlice({
  name: "members",
  initialState,

  reducers: {
    // ✅ ADD MEMBER
    addMember: (state, action) => {
      state.members.push(action.payload);
    },
    addPayment: (state, action) => {
      state.payments.push(action.payload);
    },
    togglePaymentStatus: (state, action) => {
      const payment = state.payments.find((p) => p.id === action.payload.id);

      if (payment) {
        payment.status =
          payment.status === "completed" ? "pending" : "completed";
      }
    },
    deletePayment: (state, action) => {
      state.payments = state.payments.filter((p) => p.id !== action.payload);
    },
    // ✅ UPDATE MEMBER (SAFE PATCH STYLE)
    updateMember: (state, action) => {
      const index = state.members.findIndex(
        (u) => u._id === action.payload._id, // 🔥 IMPORTANT FIX
      );

      if (index !== -1) {
        state.members[index] = {
          ...state.members[index],
          ...action.payload,
        };
      }
    },
    rechargeCount: (state, action) => {
      const user = state.members.find((m) => m._id === action.payload._id);

      if (user) {
        user.rechargeCount += 1;
      }
    },

    // withdraw reducer
    withdrawCount: (state, action) => {
      const user = state.members.find((m) => m._id === action.payload._id);

      if (user) {
        user.withdrawCount += 1;
      }
    },
    // delete member reducer
    deleteMember: (state, action) => {
      state.members = state.members.filter(
        (member) => member._id !== action.payload,
      );
    },
    // reset total orders reducer
    resetTotalOrders: (state, action) => {
      const member = state.members.find((m) => m._id === action.payload);

      if (member) {
        member.totalOrders = 0;
      }
    },
    addInjection: (state, action) => {
      state.injections.push(action.payload);
    },
    invertInjectionStatus: (state, action) => {
      const injection = state.injections.find(
        (i) => i.id === action.payload.id,
      );

      if (injection) {
        injection.status =
          injection.status === "completed" ? "pending" : "completed";

        injection.completedAt =
          injection.status === "completed" ? new Date().toISOString() : null;
      }
    },
    deleteInjection: (state, action) => {
      state.injections = state.injections.filter(
        (i) => i.id !== action.payload,
      );
    },
  },
});

export const {
  addMember,
  updateMember,
  rechargeCount,
  withdrawCount,
  deleteMember,
  resetTotalOrders,
  addInjection,
  invertInjectionStatus,
  deleteInjection,
  addPayment,
  updatePayment,
  togglePaymentStatus,
  deletePayment,
} = memberSlice.actions;

export default memberSlice.reducer;
