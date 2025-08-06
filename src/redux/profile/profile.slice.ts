import { createSlice } from "@reduxjs/toolkit";

import { getUserById } from "./profile.thunk";

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

export interface ProfileState {
  user: null | IUserDoc | string;
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.error = null;
        state.loading = false;
        state.user = payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = state.error =
          (action.payload as string) ||
          action.error.message ||
          "Registration error";
      });
  },
});
export default profileSlice.reducer;
