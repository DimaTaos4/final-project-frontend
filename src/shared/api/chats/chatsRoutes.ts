import { backendInstanceChats } from "../backendInstance";

export const getChatApi = async (recipientId: string, token: string) => {
  const { data } = await backendInstanceChats.post(
    "/get-or-create",
    {
      recipientId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};

export const getChatsByUserId = async (userId: string) => {
  const { data } = await backendInstanceChats.get(`/${userId}`);
  return data;
};
