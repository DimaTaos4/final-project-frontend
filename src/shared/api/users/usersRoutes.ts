import { backendInstance } from "./../backendInstance";

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
