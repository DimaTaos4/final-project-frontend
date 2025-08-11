import styles from "./NotificationsModal.module.css";
import { AvatarIchgram } from "../../../../shared/components/icons";
import { useEffect, useState } from "react";
import { getNotificationsApi } from "../../../../shared/api/notifications/notificationsRoutes";
import { AxiosError } from "axios";
import Loader from "../../../../shared/components/Loader/Loader";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../../../../shared/utils/dateUtils";

interface NotifModalProps {
  onClose: () => void;
}

interface Notification {
  _id: string;
  type: "like" | "comment" | "follow";
  sender: {
    _id: string;
    userName: string;
    avatarUrl?: string;
  };
  post?: {
    _id: string;
    imageUrls: string[];
  };
  comment?: string;
  isRead: boolean;
  createdAt: string;
}

const NotificationsModal = ({ onClose }: NotifModalProps) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const token = localStorage.getItem("token");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      if (!token) return;
      const data = await getNotificationsApi(token);
      setNotifications(data);
    } catch (err) {
      if (err instanceof AxiosError)
        setError(err.message || "Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <section className={styles.overlay} onClick={handleClickOutside}>
      <div className={styles.notificationsModal}>
        <h2 className={styles.notifications}>Notifications</h2>
        {notifications.length > 0 && <p className={styles.new}>New</p>}
        {loading && (
          <div className={styles.loading}>
            <Loader loading={loading} />
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && notifications.length === 0 && (
          <p className={styles.empty}>No notifications yet.</p>
        )}

        {!loading && notifications.length > 0 && (
          <div className={styles.notificationsBlock}>
            {notifications.map((notif) => (
              <div className={styles.notInfo} key={notif._id}>
                <div className={styles.infoUser}>
                  {notif.sender.avatarUrl ? (
                    <img
                      src={notif.sender.avatarUrl}
                      alt="avatar"
                      className={styles.avatar}
                    />
                  ) : (
                    <AvatarIchgram size={40} color="white" />
                  )}
                  <div className={styles.textInfo}>
                    <span className={styles.username}>
                      <Link
                        to={`/user/${notif.sender._id}`}
                        className={styles.usernameLink}
                      >
                        {notif.sender.userName}
                      </Link>
                    </span>
                    <span className={styles.infoText}>
                      {notif.type === "like" && "liked your post."}
                      {notif.type === "comment" &&
                        `commented: "${notif.comment}"`}
                      {notif.type === "follow" && "started following you."}
                    </span>
                    <span className={styles.actionTime}>
                      {getRelativeTime(notif.createdAt)}
                    </span>
                  </div>
                </div>

                {(notif.type === "like" || notif.type === "comment") &&
                  notif.post?.imageUrls?.[0] && (
                    <img
                      src={notif.post.imageUrls[0]}
                      alt="post preview"
                      className={styles.postImage}
                    />
                  )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NotificationsModal;
