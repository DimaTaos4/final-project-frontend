import { createSlice } from "@reduxjs/toolkit";

import { registerUser, loginUser, getUserById } from "./users.thunk";
export interface IUserDoc {
  id: string;
  email: string;
  fullName: string;
  userName: string;
  bio?: string;
  avatarUrl?: string;
  link?: string;
  message?: string;
}

export interface AuthState {
  user: null | IUserDoc | string;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  isAuth: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.user = payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error =
          (action.payload as string) ||
          action.error.message ||
          "Registration error";
      })
      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.loading = false;
        state.error = null;
        state.user = payload;
        state.isAuth = true;
        localStorage.setItem("token", payload.token);
        localStorage.setItem("user", JSON.stringify(payload.user));
      })
      .addCase(loginUser.rejected, (state, { payload, error }) => {
        state.error = state.error =
          (payload as string) || error.message || "Registration error";
      })
      // getUserById
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(getUserById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});
export default authSlice.reducer;
