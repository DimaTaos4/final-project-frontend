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

export const getAllMyPostsApi = async (token: string) => {
  const { data } = await backendInstancePosts.get(`/mine`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getPostByIdApi = async (id: string) => {
  const { data } = await backendInstancePosts.get(`/${id}`, {});
  return data;
};

export const updatePostByIdApi = async (
  id: string,
  token: string,
  formData: FormData
) => {
  const { data } = await backendInstancePosts.patch(`/edit/${id}`, formData, {
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

export const getPostsByIdUser = async (userId: string) => {
  const { data } = await backendInstancePosts.get(`/byuser/${userId}`);
  return data;
};

export const getAllPostsApi = async () => {
  const { data } = await backendInstancePosts.get("/");
  return data;
};

export const getPostFromFollowing = async (userId: string) => {
  const { data } = await backendInstancePosts.get(`/feed/${userId}`);
  return data;
};
