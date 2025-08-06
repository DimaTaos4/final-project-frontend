import { createSlice } from "@reduxjs/toolkit";

import {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
  followUser,
} from "./users.thunk";

export interface IUserDoc {
  _id: string;
  email: string;
  fullName: string;
  userName: string;
  bio?: string;
  avatarUrl?: string;
  followers: string[];
  following: string[];
  link?: string;
  message?: string;
  isVerified?: boolean;
  verificationToken?: string;
}

export interface AuthState {
  user: null | IUserDoc | string;
  allUsers: null | IUserDoc;
  token: string | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  allUsers: null,
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
        state.token = null;
        state.isAuth = false;
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
          (payload as string) || error.message || "Error by login";
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
      })
      // getAllUsers
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allUsers = payload;
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      // followUser
      .addCase(followUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(followUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(followUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
