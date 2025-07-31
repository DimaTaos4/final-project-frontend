import { useEffect, useRef, useState } from "react";
import styles from "./PostModal.module.css";
import ichgramBackground from "../../../../assets/ichgamBackground.png";
import buttonEdit from "../../../../assets/buttonEdit.png";
import Comments from "./Comments/Comments";
import { LikeIcon } from "../../icons";
import CommentIcon from "../../icons/CommentIcon";
import AddCommentForm from "./AddCommentForm/AddCommentForm";
import type { IPostData } from "../../../api/posts/postsRoutes";
import Loader from "../../Loader/Loader";
import useDataUser from "../../../hooks/useDataUser";
import { AvatarIchgram } from "../../icons/index";
import PostActionsModal from "./PostActionsModal/PostActionsModal";
import EditPostModal from "../EditPostModal/EditPostModal";
interface PostModalProps {
  onClose: () => void;
  post: IPostData;
  loading: boolean;
  error: string | null;
  onPostDeleted: (id: string) => void;
}

const PostModal = ({
  onClose,
  post,
  loading,
  error,
  onPostDeleted,
}: PostModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isActionsModalOpen, setIsActionsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { dataUser } = useDataUser(post.author);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !isActionsModalOpen &&
        !isEditModalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, isEditModalOpen, isActionsModalOpen]);

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modalCenter}>
          <Loader loading={true} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modalCenter}>
          <p className={styles.error}>Ошибка: {error}</p>
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
    );
  }

  if (!post) return null;

  const hasMultipleImages = post.imageUrls && post.imageUrls.length > 1;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? post.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === post.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    if (diff < 60) return rtf.format(-diff, "second");
    if (diff < 3600) return rtf.format(-Math.floor(diff / 60), "minute");
    if (diff < 86400) return rtf.format(-Math.floor(diff / 3600), "hour");
    return rtf.format(-Math.floor(diff / 86400), "day");
  };

  return (
    <>
      <div className={styles.overlay}>
        <div ref={modalRef} className={styles.postModal}>
          <div className={styles.blockImage}>
            <img
              className={styles.image}
              src={
                post.imageUrls && post.imageUrls.length > 0
                  ? post.imageUrls[currentIndex]
                  : ichgramBackground
              }
              alt="image"
            />
            {hasMultipleImages && (
              <>
                <button className={styles.prevBtn} onClick={handlePrev}>
                  ‹
                </button>
                <button className={styles.nextBtn} onClick={handleNext}>
                  ›
                </button>
              </>
            )}
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.headerBlockImage}>
              <div className={styles.avaUsername}>
                {dataUser?.avatarUrl ? (
                  <img
                    className={styles.ava}
                    src={dataUser?.avatarUrl}
                    alt="ava"
                  />
                ) : (
                  <AvatarIchgram size={28} color="white" />
                )}
                <span className={styles.username}>{dataUser?.userName}</span>
              </div>
              <button
                className={styles.btnEdit}
                onClick={() => setIsActionsModalOpen(true)}
              >
                <img src={buttonEdit} alt="button edit" />
              </button>
            </div>

            <div className={styles.scrollContent}>
              <div className={styles.blockInfo}>
                <div className={styles.info}>
                  {dataUser?.avatarUrl ? (
                    <img
                      className={styles.ava}
                      src={dataUser?.avatarUrl}
                      alt="ava"
                    />
                  ) : (
                    <AvatarIchgram size={28} color="white" />
                  )}
                  <div className={styles.infoText}>
                    <span className={styles.username}>
                      {dataUser?.userName}{" "}
                    </span>
                    {post.caption}
                  </div>
                </div>
                <span className={styles.time}>
                  {post.updatedAt && post.createdAt
                    ? getRelativeTime(
                        post.updatedAt !== post.createdAt
                          ? post.updatedAt
                          : post.createdAt
                      ) + (post.updatedAt !== post.createdAt ? " (edited)" : "")
                    : "unknown"}
                </span>
              </div>
              <Comments />
            </div>

            <div className={styles.footerBlockImage}>
              <div className={styles.likeCommentBlock}>
                <div className={styles.likeComment}>
                  <LikeIcon size={21} className={styles.likeIcon} />
                  <CommentIcon
                    size={21}
                    color="#fff"
                    className={styles.commentIcon}
                  />
                </div>
                <div className={styles.imageInfo}>
                  <p className={styles.likes}>25 likes</p>
                  <p className={styles.timeInLikeComment}>1 day</p>
                </div>
              </div>
              <AddCommentForm />
            </div>
          </div>
        </div>
      </div>
      {isActionsModalOpen && (
        <PostActionsModal
          onClose={() => setIsActionsModalOpen(false)}
          post={post}
          onPostDeleted={onPostDeleted}
          onEditClick={() => {
            setIsActionsModalOpen(false);
            setIsEditModalOpen(true);
          }}
        />
      )}
      {isEditModalOpen && (
        <EditPostModal
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};

export default PostModal;
