import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPostsApi,
  deletePostApi,
} from "../../shared/api/posts/postsRoutes";
import axios from "axios";

interface IDeleteArg {
  id: string;
  token: string;
}

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async (token: string, { rejectWithValue }) => {
    try {
      const data = await getAllPostsApi(token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.message || "Failed to fetch posts"
        );
      }
      return rejectWithValue("Unknown error");
    }
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async ({ id, token }: IDeleteArg, { rejectWithValue }) => {
    try {
      const data = await deletePostApi(id, token);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(
          error.response.data?.message || "Failed to fetch posts"
        );
      }
      return rejectWithValue("Unknown error");
    }
  }
);
