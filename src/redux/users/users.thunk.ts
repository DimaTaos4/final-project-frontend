import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  registerUserApi,
  loginUserApi,
  getUserApiById,
  getAllUsersApi,
  followUserApi,
} from "../../shared/api/users/usersRoutes";
import type {
  ILoginData,
  IRegisterData,
} from "../../shared/api/users/usersRoutes";

export interface IFollowProps {
  userId: string;
  token: string;
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
          error?.response?.data?.message || "Login failed"
        );
      }
    }
  }
);

export const getUserById = createAsyncThunk(
  "auth/getUser",
  async (userId: string, { rejectWithValue }) => {
    try {
      const result = await getUserApiById(userId);
      return result;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error?.response?.data?.message || "Login failed"
        );
      }
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
          error?.response?.data?.message || "Login failed"
        );
      }
    }
  }
);
