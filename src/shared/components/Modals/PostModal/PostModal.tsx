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
import { getRelativeTime } from "../../../utils/dateUtils";
import { likePostApi } from "../../../api/posts/postsRoutes";
import useAuth from "../../../hooks/useAuth";
import { AxiosError } from "axios";

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
  const [likeError, setLikeError] = useState<AxiosError | null>(null);
  const [localPost, setLocalPost] = useState<IPostData>(post);

  const { dataUser } = useDataUser(post.author as string);

  const { user } = useAuth();
  const token = localStorage.getItem("token");

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
          <p className={styles.error}> {error}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  }

  if (likeError) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modalCenter}>
          <p className={styles.error}> {likeError.message}</p>
          <button onClick={onClose}>Close</button>
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
  if (!user) return null;

  const handleLike = async (postId: string, token: string) => {
    try {
      const data = await likePostApi(postId, token);
      setLocalPost(data);
    } catch (error) {
      if (error instanceof AxiosError) setLikeError(error);
    }
  };
  if (!dataUser) return;
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
                      {dataUser?.userName}
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
              <Comments localPost={localPost} dataUser={dataUser} />
            </div>

            <div className={styles.footerBlockImage}>
              <div className={styles.likeCommentBlock}>
                <div className={styles.likeComment}>
                  {localPost.likes?.includes(user?.id) ? (
                    <button
                      className={styles.likeIcon}
                      onClick={() => handleLike(localPost._id, token as string)}
                    >
                      <LikeIcon
                        size={21}
                        className={styles.likeIcon}
                        color="#FF0014"
                        filled
                      />
                    </button>
                  ) : (
                    <button
                      className={styles.likeIcon}
                      onClick={() => handleLike(localPost._id, token as string)}
                    >
                      <LikeIcon size={21} className={styles.likeIcon} />
                    </button>
                  )}

                  <CommentIcon
                    size={21}
                    color="#fff"
                    className={styles.commentIcon}
                  />
                </div>
                <div className={styles.imageInfo}>
                  <p className={styles.likes}>
                    {localPost.likes?.length} likes
                  </p>
                  <p className={styles.timeInLikeComment}>
                    {post.updatedAt && post.createdAt
                      ? getRelativeTime(
                          post.updatedAt !== post.createdAt
                            ? post.updatedAt
                            : post.createdAt
                        )
                      : "unknown"}
                  </p>
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
        <EditPostModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </>
  );
};

export default PostModal;
