import styles from "./MessageWindow.module.css";
import { AvatarIchgram } from "../../../shared/components/icons";
import ava from "../../../assets/ichgamBackground.png";

const MessageWindow = () => {
  return (
    <section className={styles.messageWindow}>
      <div className={styles.headerWindow}>
        <img src={ava} alt="avatar" className={styles.avatarHeader} />
        <h3 className={styles.usernameSender}>username</h3>
      </div>

      <div className={styles.messageBlock}>
        <div className={styles.infoPartner}>
          <img src={ava} alt="avatar" className={styles.avatarPartner} />
          <span className={styles.fullName}>Full Name</span>
          <span className={styles.usernameInChat}>@username</span>
          <a href="/" className={styles.linkToProfile}>
            View Profile
          </a>
          <span className={styles.firstDate}>Jun 26, 2024, 08:49 PM.</span>
        </div>

        <div className={styles.chatMessages}>
          {/* Incoming */}
          <div className={styles.messageIncoming}>
            <img src={ava} alt="avatar" className={styles.avatarLeft} />
            <p className={styles.textIncoming}>
              Привет! Как дела? Работал над проектом сегодня? Lorem ipsum dolor,
              sit amet consectetur adipisicing elit. Ex deleniti sed aliquam
              fuga similique quam ipsa tempore praesentium vel ducimus! Tempora
              fugiat, velit voluptate quod ullam amet iusto veritatis assumenda
              architecto facere dolor eligendi nihil odit neque repellat
            </p>
          </div>

          {/* Outgoing */}
          <div className={styles.messageOutcoming}>
            <p className={styles.textOutgoing}>
              Привет! Да, делал компонент, сейчас доделываю стили чата. lorem500
            </p>
            <AvatarIchgram
              size={28}
              color="white"
              className={styles.avatarRight}
            />
          </div>

          {/* Incoming — длинный */}
          <div className={styles.messageIncoming}>
            <img src={ava} alt="avatar" className={styles.avatarLeft} />
            <p className={styles.textIncoming}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <input
          type="text"
          className={styles.inputText}
          placeholder="Message..."
        />
        <button type="submit" className={styles.btnSendMessage}>
          send
        </button>
      </div>
    </section>
  );
};

export default MessageWindow;
