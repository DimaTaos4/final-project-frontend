import styles from "./NotificationsModal.module.css";
import { AvatarIchgram } from "../../../../shared/components/icons";
import { useEffect, useState } from "react";
import { getNotificationsApi } from "../../../../shared/api/notifications/notificationsRoutes";
import { getPostByIdApi } from "../../../../shared/api/posts/postsRoutes";
import { AxiosError } from "axios";
import Loader from "../../../../shared/components/Loader/Loader";
import { Link } from "react-router-dom";
import { getRelativeTime } from "../../../../shared/utils/dateUtils";
import ichgramLogo from "../../../../assets/ichgramLogo.png";
import PostModal from "../../../../shared/components/Modals/PostModal/PostModal";
import type { IPostData } from "../../../../shared/api/posts/postsRoutes";
import { deletePost, getAllPosts } from "../../../../redux/posts/post.thunk";
import { useAppDispatch } from "../../../../shared/hooks/useAppDispatch";
import { toast } from "react-toastify";

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
  const token = localStorage.getItem("token");

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<IPostData | null>(null);
  const [postLoading, setPostLoading] = useState(false);
  const [postError, setPostError] = useState<string | null>(null);

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

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handlePostClick = async (postId: string) => {
    setPostLoading(true);
    setPostError(null);
    try {
      const data = await getPostByIdApi(postId);
      setSelectedPost(data);
      setIsPostModalOpen(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        setPostError(err.message);
      } else {
        setPostError("Unknown error");
      }
    } finally {
      setPostLoading(false);
    }
  };
  const dispatch = useAppDispatch();

  const handlePostDeleted = async (deletedId: string) => {
    if (!token) return;
    try {
      setIsPostModalOpen(false);
      setSelectedPost(null);
      await dispatch(deletePost({ id: deletedId, token })).unwrap();
      await dispatch(getAllPosts(token));
      toast.success("Post successfully deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  };

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
          <div className={styles.empty}>
            <img
              src={ichgramLogo}
              alt="ichgram-logo"
              className={styles.emptyLogo}
            />
            <h3 className={styles.emptyTitle}>No notifications yet</h3>
            <p className={styles.emptyText}>
              Likes, comments, and follows will show up here.
            </p>
          </div>
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
                      onClick={() => handlePostClick(notif.post!._id)}
                    />
                  )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isPostModalOpen && selectedPost && (
        <PostModal
          onClose={() => {
            setIsPostModalOpen(false);
            setSelectedPost(null);
          }}
          post={selectedPost}
          loading={postLoading}
          error={postError}
          onPostDeleted={handlePostDeleted}
        />
      )}
    </section>
  );
};

export default NotificationsModal;
