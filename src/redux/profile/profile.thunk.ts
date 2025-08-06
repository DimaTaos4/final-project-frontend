import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserApiById } from "../../shared/api/users/usersRoutes";
import axios from "axios";

export const getUserById = createAsyncThunk(
  "profile/getUserById",
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
