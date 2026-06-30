import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // 📥 set all orders
    setOrders: (state, action) => {
      state.orders = action.payload;
    },

    // ➕ add new order (trade placed)
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
    },

    // 🔄 update order status (win / loss / pending)
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;

      const order = state.orders.find((o) => o._id === orderId);

      if (order) {
        order.status = status;
        order.completedAt = new Date().toISOString();
      }
    },

    // ❌ delete order
    deleteOrder: (state, action) => {
      state.orders = state.orders.filter((o) => o._id !== action.payload);
    },
  },
});

export const { setOrders, addOrder, updateOrderStatus, deleteOrder } =
  ordersSlice.actions;

export default ordersSlice.reducer;
