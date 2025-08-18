import styles from "./MessageWindow.module.css";
import { AvatarIchgram } from "../../../shared/components/icons";
import { getMessagesFromChatId } from "../../../shared/api/messages/messagesRoutes";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import NoChatPage from "../../NoChatPage/NoChatPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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

const { VITE_BACKEND_API_URL } = import.meta.env;

const MessageWindow = () => {
  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user") as string);
  const { chatId } = useParams();

  const [messageData, setMessageData] = useState<MessageType[]>([]);
  const [participants, setParticipants] = useState<UserType[]>([]);
  const [messageText, setMessageText] = useState("");

  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const partner = participants.find((p) => p._id !== currentUser._id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!chatId) return;

    const socket = io(VITE_BACKEND_API_URL);
    socketRef.current = socket;

    socket.emit("join-chat", chatId);

    socket.on("receive-message", (message: MessageType) => {
      setMessageData((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatId]);
  const [chatNotFound, setChatNotFound] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId || !token) return;
      try {
        const { messages, participants } = await getMessagesFromChatId(
          chatId,
          token
        );
        setMessageData(messages);
        setParticipants(participants);
      } catch (error) {
        console.error(error);

        if (axios.isAxiosError(error) && error.response?.status === 404) {
          setChatNotFound(true);
        } else {
          setChatNotFound(true);
        }
      }
    };

    fetchMessages();
  }, [chatId, token]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatId || !token) return;
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
    };

    fetchMessages();
  }, [chatId, token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageData]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !token || !chatId || !partner) return;

    const messageToSend = {
      chatId,
      senderId: currentUser._id,
      recipientId: partner._id,
      text: messageText.trim(),
    };

    socketRef.current?.emit("send-message", messageToSend);
    setMessageText("");
  };
  if (chatNotFound) {
    return <NoChatPage />;
  }
  const messageElements = messageData.map((message) => {
    const isOwn = message.sender._id === currentUser._id;

    return isOwn ? (
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
            className={styles.avatarLeft}
          />
        )}
        <p className={styles.textIncoming}>{message.text}</p>
      </div>
    );
  });

  return (
    <section className={styles.messageWindow}>
      <div className={styles.headerWindow}>
        <button
          className={styles.backBtn}
          onClick={() => navigate("/messages")}
        >
          <ArrowLeft />
        </button>

        {partner?.avatarUrl ? (
          <img
            src={partner.avatarUrl}
            alt="avatar"
            className={styles.avatarHeader}
          />
        ) : (
          <AvatarIchgram size={44} color="white" />
        )}
        <h3 className={styles.usernameSender}>{partner?.userName}</h3>
      </div>

      <div className={styles.messageBlock}>
        <div className={styles.infoPartner}>
          {partner?.avatarUrl ? (
            <img
              src={partner.avatarUrl}
              alt="avatar"
              className={styles.avatarPartner}
            />
          ) : (
            <AvatarIchgram size={96} color="white" />
          )}
          <span className={styles.fullName}>{partner?.fullName}</span>
          <span className={styles.usernameInChat}>{partner?.userName}</span>
          <a href={`/user/${partner?._id}`} className={styles.linkToProfile}>
            View Profile
          </a>
          <span className={styles.firstDate}>
            {messageData[0]?.createdAt
              ? new Date(messageData[0].createdAt).toLocaleString("en-US", {
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

        <div className={styles.chatMessages}>
          {messageElements}
          <div ref={messagesEndRef} />
        </div>
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
