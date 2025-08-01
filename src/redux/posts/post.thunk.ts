import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllPostsApi,
  deletePostApi,
  getPostByIdApi,
  updatePostByIdApi,
} from "../../shared/api/posts/postsRoutes";
import axios from "axios";

interface IDeleteArg {
  id: string;
  token: string;
}

interface IUpdatePostProps {
  id: string;
  token: string;
  formData: FormData;
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

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id: string, { rejectWithValue }) => {
    try {
      const data = await getPostByIdApi(id);
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

export const updatePostById = createAsyncThunk(
  "post/updatePost",
  async ({ id, token, formData }: IUpdatePostProps, { rejectWithValue }) => {
    try {
      const data = await updatePostByIdApi( id, token, formData );
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
