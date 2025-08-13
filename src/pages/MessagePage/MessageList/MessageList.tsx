import styles from "./MessageList.module.css";
import { NavLink } from "react-router-dom";
import { AvatarIchgram } from "../../../shared/components/icons";
import { getChatsByUserId } from "../../../shared/api/chats/chatsRoutes";
import { useEffect, useState } from "react";
import ichgramLogo from "../../../assets/ichgramLogo.png";
export interface IUser {
  _id: string;
  fullName: string;
  userName: string;
  avatarUrl?: string;
}

export interface IMessage {
  _id: string;
  chatId: string;
  sender: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export interface IChat {
  _id: string;
  participants: IUser[];
  createdAt: string;
  updatedAt: string;
  lastMessage: IMessage | null;
}

const MessageList = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const user: IUser = JSON.parse(localStorage.getItem("user") as string);

  useEffect(() => {
    async function fetchChats(userId: string) {
      try {
        const data: IChat[] = await getChatsByUserId(userId);
        setChats(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (user?._id) {
      fetchChats(user._id);
    }
  }, []);

  if (!user) return <p>Unauthorized</p>;

  return (
    <section className={styles.messageList}>
      <h2 className={styles.username}>{user.userName}</h2>

      {chats.length > 0 ? (
        chats.map((chat) => {
          const partner = chat.participants.find((p) => p._id !== user._id);

          return (
            <NavLink
              to={`/messages/${chat._id}`}
              className={styles.linkMessage}
              key={chat._id}
            >
              <div className={styles.messageInfo}>
                {partner?.avatarUrl ? (
                  <img
                    src={partner.avatarUrl}
                    alt="avatar"
                    className={styles.avatar}
                  />
                ) : (
                  <AvatarIchgram
                    size={56}
                    color="white"
                    className={styles.avatar}
                  />
                )}

                <div className={styles.messageText}>
                  <span className={styles.usernameSender}>
                    {partner?.userName || "Unknown"}
                  </span>

                  <div className={styles.infoSenderBlock}>
                    <span className={styles.infoSender}>
                      {chat.lastMessage?.text
                        ? `${chat.lastMessage.text.slice(0, 40)}...`
                        : "No messages yet."}
                    </span>
                    <span className={styles.sendTime}>
                      {chat.updatedAt
                        ? new Date(chat.updatedAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })
      ) : (
        <div className={styles.emptyState}>
          <img
            src={ichgramLogo}
            alt="Ichgram logo"
            className={styles.emptyLogo}
          />
          <h3 className={styles.emptyTitle}>No messages yet</h3>
          <p className={styles.emptyText}>
            Start a conversation with your friends and see your messages here.
          </p>
        </div>
      )}
    </section>
  );
};

export default MessageList;
