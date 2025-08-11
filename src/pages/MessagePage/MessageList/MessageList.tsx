import styles from "./MessageList.module.css";
import { NavLink } from "react-router-dom";
import { AvatarIchgram } from "../../../shared/components/icons";
import avatar from "../../../assets/troubleImage.png";
const MessageList = () => {
  return (
    <section className={styles.messageList}>
      <h2 className={styles.username}>username</h2>
      <NavLink to="chat" className={styles.linkMessage}>
        <div className={styles.messageInfo}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          {/* <AvatarIchgram size={56} color="white" className="avatarImage" /> */}
          <div className={styles.messageText}>
            <span className={styles.usernameSender}>nikita</span>
            <div className={styles.infoSenderBlock}>
              <span className={styles.infoSender}>Nikiita sent a message.</span>
              <span className={styles.sendTime}>2 wek</span>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to="chat" className={styles.linkMessage}>
        <div className={styles.messageInfo}>
          {/* <img src={avatar} alt="avatar" className={styles.avatar} /> */}
          <AvatarIchgram size={56} color="white" className="avatarImage" />
          <div className={styles.messageText}>
            <span className={styles.usernameSender}>nikita</span>
            <div className={styles.infoSenderBlock}>
              <span className={styles.infoSender}>Nikiita sent a message.</span>
              <span className={styles.sendTime}>2 wek</span>
            </div>
          </div>
        </div>
      </NavLink>
      <NavLink to="chat" className={styles.linkMessage}>
        <div className={styles.messageInfo}>
          <img src={avatar} alt="avatar" className={styles.avatar} />
          {/* <AvatarIchgram size={56} color="white" className="avatarImage" /> */}
          <div className={styles.messageText}>
            <span className={styles.usernameSender}>nikita</span>
            <div className={styles.infoSenderBlock}>
              <span className={styles.infoSender}>Nikiita sent a message.</span>
              <span className={styles.sendTime}>2 wek</span>
            </div>
          </div>
        </div>
      </NavLink>
    </section>
  );
};
export default MessageList;
