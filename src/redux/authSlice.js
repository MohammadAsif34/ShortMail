import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuth = true;
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.isAuth = false;
      state.token = null;
      state.error = null;

      if (action.payload?.clearUser)
        action.payload.dispatch({ type: "user/clearUser" });

      if (action.payload?.clearMails)
        action.payload.dispatch({ type: "mail/clearMails" });
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
