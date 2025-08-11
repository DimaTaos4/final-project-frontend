import styles from "./MessagePage.module.css";
import MessageList from "./MessageList/MessageList";
import { Outlet } from "react-router-dom";
const MessagePage = () => {
  return (
    <section className={styles.messagePage}>
      <MessageList />
      <div>
        <Outlet />
      </div>
    </section>
  );
};
export default MessagePage;
