import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user : JSON.parse(localStorage.getItem("user") ?? 'null'),
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
  },
});

// export const userLoginThunk = (data) => async (dispatch) => {
//   dispatch(login({ ...userData, jwt}))
//   // const response = await fetch(`/fakeApi/todo/${jwt}`)
//   // dispatch(login(await response.json()))
// }

export const {login, logout} = authSlice.actions;

export default authSlice.reducer;