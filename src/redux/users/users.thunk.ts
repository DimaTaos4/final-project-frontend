import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  registerUserApi,
  loginUserApi,
  getUserApiById,
  getAllUsersApi,
  followUserApi,
  unfollowUserApi,
  editUserApi,
} from "../../shared/api/users/usersRoutes";
import type {
  ILoginData,
  IRegisterData,
} from "../../shared/api/users/usersRoutes";

export interface IFollowProps {
  userId: string;
  token: string;
}

export interface EditProps {
  token: string;
  formData: FormData;
}

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: IRegisterData, { rejectWithValue }) => {
    try {
      const result = await registerUserApi(data);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Registration failed"
        );
      }

      return rejectWithValue("Unknown error occurred during registration");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: ILoginData, { rejectWithValue }) => {
    try {
      const result = await loginUserApi(data);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Login failed"
        );
      }

      return rejectWithValue("Unknown error occurred during logining");
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "auth/getAllUsers",
  async (__, { rejectWithValue }) => {
    try {
      const result = await getAllUsersApi();
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Something went wrong"
        );
      }
    }
  }
);

export const getUserById = createAsyncThunk(
  "auth/getUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await getUserApiById(userId);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Something went wrong"
        );
      }
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "auth/editUser",
  async ({ token, formData }: EditProps, { rejectWithValue }) => {
    try {
      const result = await editUserApi(token, formData);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error?.response?.data?.message || "Edit failed");
      }

      return rejectWithValue("Unknown error occurred during logining");
    }
  }
);

export const followUser = createAsyncThunk(
  "auth/followUser",
  async ({ userId, token }: IFollowProps, { rejectWithValue }) => {
    try {
      const result = await followUserApi(userId, token);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Following failed"
        );
      }
    }
  }
);

export const unfollowUser = createAsyncThunk(
  "auth/unfollowUser",
  async ({ userId, token }: IFollowProps, { rejectWithValue }) => {
    try {
      const result = await unfollowUserApi(userId, token);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Unfollowing failed"
        );
      }
    }
  }
);
