import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") ?? null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.token = action.payload.accessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export default {login, logout} = authSlice.actions;

export default authSlice.reducer;