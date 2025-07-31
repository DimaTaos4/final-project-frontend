import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/users.slice";
import postReducer from "./posts/post.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
