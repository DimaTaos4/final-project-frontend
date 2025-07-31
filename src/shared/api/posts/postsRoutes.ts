import { backendInstancePosts } from "../backendInstance";

export interface IPostData {
  _id: string;
  author: string;
  imageUrls: string[];
  caption?: string;
  createdAt: string;
  updatedAt: string;
}

export const getPosts = async (token: string) => {
  const { data } = await backendInstancePosts.get("/mine", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const uploadPostsApi = async (
  token: string,
  formData: FormData
): Promise<IPostData> => {
  const { data } = await backendInstancePosts.post("/", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getAllPostsApi = async (token: string) => {
  const { data } = await backendInstancePosts.get(`/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getPostById = async (token: string, id: string) => {
  const { data } = await backendInstancePosts.get(`/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const deletePostApi = async (id: string, token: string) => {
  const { data } = await backendInstancePosts.delete(`/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
