import { backendInstance } from "../backendInstance";

export interface IValues {
  avatar?: FileList;
  bio?: string;
  link?: string;
  userName?: string;
  removeAvatar?: boolean;
}

export interface IRegisterData {
  email: string;
  fullName: string;
  userName: string;
  password: string;
  bio?: string;
  avatarUrl?: string;
}
export interface ILoginData {
  email: string;
  password: string;
}
export const registerUserApi = async (payload: IRegisterData) => {
  const { data } = await backendInstance.post("/register", payload);
  return data;
};

export const loginUserApi = async (payload: ILoginData) => {
  const { data } = await backendInstance.post("/login", payload);
  return data;
};



export const getUserApiById = async (id: string) => {
  const { data } = await backendInstance.get(`/${id}`);
  return data;
};

export const editUserApi = async (token: string, formData: FormData) => {
  const { data } = await backendInstance.patch("/edit", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
