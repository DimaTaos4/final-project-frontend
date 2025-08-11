import axios from "axios";
const { VITE_API_USERS_URL, VITE_API_POSTS_URL, VITE_API_NOTIFICATIONS_URL } =
  import.meta.env;

export const backendInstance = axios.create({
  baseURL: VITE_API_USERS_URL,
});

export const backendInstancePosts = axios.create({
  baseURL: VITE_API_POSTS_URL,
});

backendInstancePosts.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }

    return Promise.reject(error);
  }
);

export const backendInstanceNotifications = axios.create({
  baseURL: VITE_API_NOTIFICATIONS_URL,
});
