import { backendInstanceNotifications } from "./../backendInstance";

export const getNotificationsApi = async (token: string) => {
  const { data } = await backendInstanceNotifications.get("/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
