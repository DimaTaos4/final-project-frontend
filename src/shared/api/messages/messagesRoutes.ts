import { backendInstanceMessages } from "./../backendInstance";

export const getMessagesFromChatId = async (chatId: string, token: string) => {
  const { data } = await backendInstanceMessages.get(`/${chatId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const sendMessageApi = async (
  recipientId: string,
  text: string,
  token: string
) => {
  const { data } = await backendInstanceMessages.post(
    "/",
    { recipientId, text },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
