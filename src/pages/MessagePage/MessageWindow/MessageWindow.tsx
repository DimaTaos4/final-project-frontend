import styles from "./MessageWindow.module.css";
import { AvatarIchgram } from "../../../shared/components/icons";
import {
  getMessagesFromChatId,
  sendMessageApi,
} from "../../../shared/api/messages/messagesRoutes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../shared/components/Loader/Loader";
interface MessageType {
  _id: string;
  chatId: string;
  text: string;
  sender: {
    _id: string;
    fullName: string;
    userName: string;
    avatarUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface UserType {
  _id: string;
  fullName: string;
  userName: string;
  avatarUrl?: string;
}

const MessageWindow = () => {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") as string);

  const { chatId } = useParams();

  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const [participants, setParticipants] = useState<UserType[]>([]);
  const [messageText, setMessageText] = useState("");

  const partner = participants.find((p) => p._id !== currentUser._id);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageText.trim() || !token || !chatId || !partner) return;

    try {
      await sendMessageApi(partner._id, messageText.trim(), token);
      setMessageText("");

      const { messages, participants } = await getMessagesFromChatId(
        chatId,
        token
      );
      setMessageData(messages);
      setParticipants(participants);
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  useEffect(() => {
    async function fetchMessages(chatId: string, token: string) {
      try {
        const { messages, participants } = await getMessagesFromChatId(
          chatId,
          token
        );
        setMessageData(messages);
        setParticipants(participants);
      } catch (error) {
        console.error(error);
      }
    }

    if (chatId && token) {
      fetchMessages(chatId, token);
    }
  }, [chatId, token]);

  if (!partner) {
    return (
      <div className={styles.messageWindow}>
        <Loader loading={!partner} />
      </div>
    );
  }

  const createdAt = messageData[0]?.createdAt;

  const element = messageData.map((message) => {
    const isOwnMessage = message.sender._id === currentUser._id;

    return isOwnMessage ? (
      <div key={message._id} className={styles.messageOutcoming}>
        <p className={styles.textOutgoing}>{message.text}</p>
        {currentUser?.avatarUrl ? (
          <img
            src={currentUser.avatarUrl}
            alt="avatar"
            className={styles.avatarRight}
          />
        ) : (
          <AvatarIchgram
            size={28}
            color="white"
            className={styles.avatarRight}
          />
        )}
      </div>
    ) : (
      <div key={message._id} className={styles.messageIncoming}>
        {message.sender.avatarUrl ? (
          <img
            src={message.sender.avatarUrl}
            alt="avatar"
            className={styles.avatarLeft}
          />
        ) : (
          <AvatarIchgram
            size={28}
            color="white"
            className={styles.avatarRight}
          />
        )}
        <p className={styles.textIncoming}>{message.text}</p>
      </div>
    );
  });

  return (
    <section className={styles.messageWindow}>
      <div className={styles.headerWindow}>
        {partner.avatarUrl ? (
          <img
            src={partner.avatarUrl}
            alt="avatar"
            className={styles.avatarHeader}
          />
        ) : (
          <AvatarIchgram size={44} color="white" />
        )}
        <h3 className={styles.usernameSender}>{partner.userName}</h3>
      </div>

      <div className={styles.messageBlock}>
        <div className={styles.infoPartner}>
          {partner.avatarUrl ? (
            <img
              src={partner.avatarUrl}
              alt="avatar"
              className={styles.avatarPartner}
            />
          ) : (
            <AvatarIchgram size={96} color="white" />
          )}
          <span className={styles.fullName}>{partner.fullName}</span>
          <span className={styles.usernameInChat}>{partner.userName}</span>
          <a href={`/user/${partner._id}`} className={styles.linkToProfile}>
            View Profile
          </a>
          <span className={styles.firstDate}>
            {createdAt
              ? new Date(createdAt).toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : ""}
          </span>
        </div>

        <div className={styles.chatMessages}>{element}</div>
      </div>

      <form className={styles.footer} onSubmit={handleSendMessage}>
        <textarea
          className={styles.inputText}
          placeholder="Message..."
          value={messageText}
          onChange={(e) => {
            setMessageText(e.target.value);
            const textarea = e.target as HTMLTextAreaElement;
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage(e);
            }
          }}
          rows={1}
        />

        {messageText.trim() && (
          <button type="submit" className={styles.btnSendMessage}>
            send
          </button>
        )}
      </form>
    </section>
  );
};

export default MessageWindow;
