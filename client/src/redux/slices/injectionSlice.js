import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  injections: [],
  loading: false,
};

const injectionSlice = createSlice({
  name: "injections",
  initialState,
  reducers: {
    // 📥 set all injections
    setInjections: (state, action) => {
      state.injections = action.payload;
    },

    // ➕ add new injection
    addInjection: (state, action) => {
      state.injections.unshift(action.payload);
    },

    // 🔄 update injection status (approved / pending)
    updateInjectionStatus: (state, action) => {
      const { id, status } = action.payload;

      const injection = state.injections.find((i) => i._id === id);
      if (injection) {
        injection.status = status;
      }
    },

    // ❌ delete injection
    deleteInjection: (state, action) => {
      state.injections = state.injections.filter(
        (i) => i._id !== action.payload,
      );
    },

    // 📌 select injection
    setSelectedInjection: (state, action) => {
      state.selectedInjection = action.payload;
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
  setInjections,
  addInjection,
  updateInjectionStatus,
  deleteInjection,
  setSelectedInjection,
  setLoading,
  setError,
} = injectionSlice.actions;

export default injectionSlice.reducer;
