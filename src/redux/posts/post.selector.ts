import type { RootState } from "../store";

export const selectPosts = (state: RootState) => state.posts;
