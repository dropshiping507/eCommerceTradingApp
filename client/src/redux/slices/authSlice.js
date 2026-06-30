import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
    setToken: (state, action) => {},
    logout: (state) => {},
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
