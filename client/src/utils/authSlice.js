import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!localStorage.getItem("token"),
    status: localStorage.getItem("token") ? "loggedIn" : "none",
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.isAuthenticated = true;
      state.status = "loggedIn";
      state.user = action.payload;
    },
    logOut: (state) => {
      state.isAuthenticated = false;
      state.status = "none";
    },
    showLogin: (state) => {
      state.status = "loggingIn";
    },
    showSignUp: (state) => {
      state.status = "signingUp";
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

export const { logIn, logOut, showLogin, showSignUp, setUser, setError, clearUser } =
  authSlice.actions;

export const selectAuth = (state) => state.auth;

export default authSlice.reducer;
