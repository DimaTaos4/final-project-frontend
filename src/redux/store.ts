import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./users/users.slice";
import postReducer from "./posts/post.slice";
import profileReducer from "./profile/profile.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
