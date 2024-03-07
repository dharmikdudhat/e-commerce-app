import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
  updateProps: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
    },
    sendUpdateProps: (state, action) => {
      state.updateProps = action.payload;
    },
  },
});

export const { login, logout, sendUpdateProps } = authSlice.actions;

export default authSlice.reducer;
