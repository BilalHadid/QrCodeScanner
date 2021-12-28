import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    Username: (state, action) => {
      state.username = action.payload;
    },
    Password: (state, action) => {
      state.password = action.payload;
    },
  },
});
export const { Username, Password } = loginSlice.actions;
export default loginSlice.reducer;
