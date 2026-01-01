import { createSlice } from "@reduxjs/toolkit";
const data = JSON.parse(localStorage.getItem("user") || "{}");

export const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState: {
    AuthStatus: data.AuthStatus ?? false,
    User: data.User ?? null,
  },
  reducers: {
    isLogin: (state, actions) => {
      state.AuthStatus = true;
      state.User = state.User;

      localStorage.setItem(
        "user",
        JSON.stringify({
          AuthStatus: state.AuthStatus,
          User: state.User,
        })
      );
    },
    isLogout: (state) => {
      state.AuthStatus = false;
      state.User = state.User;

      localStorage.setItem(
        "user",
        JSON.stringify({
          AuthStatus: state.AuthStatus,
          User: state.User,
        })
      );
    },
    isSignup: (state, actions) => {
      state.AuthStatus = false;
      state.User = actions.payload.user;

      localStorage.setItem(
        "user",
        JSON.stringify({
          AuthStatus: state.AuthStatus,
          User: state.User,
        })
      );
    },
  },
});

export const { isLogin, isLogout, isSignup } = AuthSlice.actions;
export default AuthSlice.reducer;
