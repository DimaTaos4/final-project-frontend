import styles from "./EmptyChat.module.css";
import ichgramLogo from "../../../assets/ichgramLogo.png";
const EmptyChat = () => {
  return (
    <section className={styles.emtyChat}>
      <img
        src={ichgramLogo}
        alt="ichgram-logo"
        className={styles.ichgramLogo}
      />
      <div className={styles.emptyBlock}>
        Select a chat to start a messaging
      </div>
    </section>
  );
};
export default EmptyChat;
