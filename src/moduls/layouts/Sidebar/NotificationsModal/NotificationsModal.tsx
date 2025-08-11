import styles from "./NotificationsModal.module.css";
import { AvatarIchgram } from "../../../../shared/components/icons";
import ava from "../../../../assets/ichgramLogo.png";
import image from "../../../../assets/ichgamBackground.png";
interface NotifModalProps {
  onClose: () => void;
}

const NotificationsModal = ({ onClose }: NotifModalProps) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <section className={styles.overlay} onClick={handleClickOutside}>
      <div className={styles.notificationsModal}>
        <h2 className={styles.notifications}>Notifications</h2>
        <p className={styles.new}>New</p>
        <div className={styles.notificationsBlock}>
          <div className={styles.notInfo}>
            <div className={styles.infoUser}>
              <AvatarIchgram size={40} color="white" className="avatarImage" />
              {/* <img src={ava} alt="avatar" className={styles.avatar} /> */}
              <div className={styles.textInfo}>
                <span className={styles.username}>username</span>
                <span className={styles.infoText}>liked your post. </span>
                <span className={styles.actionTime}>2d.</span>
              </div>
            </div>
            <img src={image} alt="image post" className={styles.postImage} />
          </div>
          <div className={styles.notInfo}>
            <div className={styles.infoUser}>
              {/* <AvatarIchgram size={40} color="white" className="avatarImage" /> */}
              <img src={ava} alt="avatar" className={styles.avatar} />
              <div className={styles.textInfo}>
                <span className={styles.username}>username</span>
                <span className={styles.infoText}>liked your post. </span>
                <span className={styles.actionTime}>2d.</span>
              </div>
            </div>
            <img src={image} alt="image post" className={styles.postImage} />
          </div>
          <div className={styles.notInfo}>
            <div className={styles.infoUser}>
              {/* <AvatarIchgram size={40} color="white" className="avatarImage" /> */}
              <img src={ava} alt="avatar" className={styles.avatar} />
              <div className={styles.textInfo}>
                <span className={styles.username}>username</span>
                <span className={styles.infoText}>liked your post. </span>
                <span className={styles.actionTime}>2d.</span>
              </div>
            </div>
            <img src={image} alt="image post" className={styles.postImage} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default NotificationsModal;
