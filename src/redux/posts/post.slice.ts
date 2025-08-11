import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPosts,
  deletePost,
  getPostById,
  updatePostById,
} from "./post.thunk";
import type { IPostData } from "../../shared/api/posts/postsRoutes";
import type { IComment } from "../../shared/api/posts/postsRoutes";

interface PostByIdProps {
  _id: string;
  author: string;
  imageUrls: string[];
  caption: string;
  createdAt: string;
  updatedAt: string;
  likes: string[];
  comments: IComment[];
}

export interface InitialStatePost {
  loading: boolean;
  error: string | null;
  postById: PostByIdProps | null;
  posts: IPostData[];
}

const initialState: InitialStatePost = {
  loading: false,
  error: null,
  postById: null,
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearPostById: (state) => {
      state.postById = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPosts.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.posts = payload;
      })
      .addCase(getAllPosts.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      // deletePosts
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.posts = state.posts.filter((post) => post._id !== payload);
      })
      .addCase(deletePost.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      //getPostById
      .addCase(getPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.postById = payload;
      })
      .addCase(getPostById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      })
      // updatePostById
      .addCase(updatePostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePostById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.postById = payload;
        state.posts = state.posts.map((post) =>
          post._id === payload._id ? payload : post
        );
      })
      .addCase(updatePostById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload as string;
      });
  },
});

export default postSlice.reducer;
export const { clearPostById } = postSlice.actions;
