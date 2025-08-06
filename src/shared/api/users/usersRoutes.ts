import { backendInstance } from "./../backendInstance";

export interface IValues {
  avatar?: FileList;
  bio?: string;
  link?: string;
  userName?: string;
  removeAvatar?: boolean;
}

export interface IRegisterData {
  _id: string;
  email: string;
  fullName: string;
  userName: string;
  password: string;
  bio?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  verificationToken?: string;
}
export interface ILoginData {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  newPassword: string;
  repeatNewPassword: string;
  token: string;
}

export const registerUserApi = async (payload: IRegisterData) => {
  const { data } = await backendInstance.post("/register", payload);
  return data;
};

export const resendVerificationApi = async (email: string) => {
  const { data } = await backendInstance.post("/resend-email", { email });
  return data;
};

export const loginUserApi = async (payload: ILoginData) => {
  const { data } = await backendInstance.post("/login", payload);
  console.log(data);

  return data;
};

export const getAllUsersApi = async () => {
  const { data } = await backendInstance.get("/");
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

export const resetPasswordApi = async (payload: ResetPasswordPayload) => {
  const { data } = await backendInstance.post("/reset-password", payload);
  return data;
};

export const requestResetPassApi = async (email: string) => {
  const { data } = await backendInstance.post("/reset-request", { email });
  return data;
};

export const searchUsersApi = async (query: string) => {
  const { data } = await backendInstance.get(`/search/users`, {
    params: { q: query },
  });
  return data;
};

export const followUserApi = async (followedId: string, token: string) => {
  const { data } = await backendInstance.post(
    `/${followedId}/follow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const unfollowUserApi = async (followedId: string, token: string) => {
  const { data } = await backendInstance.post(
    `/${followedId}/unfollow`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
