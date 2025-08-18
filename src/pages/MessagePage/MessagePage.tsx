import styles from "./MessagePage.module.css";
import MessageList from "./MessageList/MessageList";
import { Outlet, useParams } from "react-router-dom";

const MessagePage = () => {
  const { chatId } = useParams();

  return (
    <section className={styles.messagePage}>
      <div
        className={`${styles.messageListWrapper} ${
          chatId ? styles.hideOnMobile : ""
        }`}
      >
        <MessageList />
      </div>
      <div
        className={`${styles.outletWrapper} ${
          chatId ? styles.showOnMobile : ""
        }`}
      >
        <Outlet />
      </div>
    </section>
  );
};

export default MessagePage;
