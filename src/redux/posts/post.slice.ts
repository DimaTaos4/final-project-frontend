import { createSlice } from "@reduxjs/toolkit";
import { getAllPosts, deletePost } from "./post.thunk";
import type { IPostData } from "../../shared/api/posts/postsRoutes";

export interface InitialStatePost {
  loading: boolean;
  error: string | null;
  posts: IPostData[];
}

const initialState: InitialStatePost = {
  loading: false,
  error: null,
  posts: [],
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
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
      });
  },
});

export default postSlice.reducer;
