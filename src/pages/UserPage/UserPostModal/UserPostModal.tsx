import styles from "./UserPostModal.module.css";
import buttonEdit from "../../../assets/buttonEdit.png";
import { LikeIcon } from "../../../shared/components/icons";
import CommentIcon from "../../../shared/components/icons/CommentIcon";
import { AvatarIchgram } from "../../../shared/components/icons";
import AddCommentForm from "../../../shared/components/Modals/PostModal/AddCommentForm/AddCommentForm";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { selectPosts } from "../../../redux/posts/post.selector";
import { getPostById } from "../../../redux/posts/post.thunk";
import { useEffect, useState } from "react";
import type { IUserDoc } from "../../../redux/users/users.slice";
import Comments from "../../../shared/components/Modals/PostModal/Comments/Comments";
import { getRelativeTime } from "../../../shared/utils/dateUtils";
interface PostIdProps {
  postId: string;
  onClose: () => void;
  dataUser: IUserDoc;
}

const UserPostModal = ({ postId, onClose, dataUser }: PostIdProps) => {
  const dispatch = useAppDispatch();
  const { postById } = useSelector(selectPosts);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    dispatch(getPostById(postId));
    setCurrentIndex(0);
  }, [postId, dispatch]);

  const images = postById?.imageUrls || [];
  const hasMultiple = images.length > 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.postModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.blockImage}>
          {images.length > 0 && (
            <img
              className={styles.image}
              src={images[currentIndex]}
              alt={`slide-${currentIndex}`}
            />
          )}

          {hasMultiple && (
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
              {dataUser.avatarUrl ? (
                <img
                  src={dataUser.avatarUrl}
                  alt="avatar"
                  className={styles.ava}
                />
              ) : (
                <AvatarIchgram size={28} color="white" />
              )}

              <span className={styles.username}>{dataUser.userName}</span>
            </div>
            <button className={styles.btnEdit}>
              <img src={buttonEdit} alt="edit button" />
            </button>
          </div>

          <div className={styles.scrollContent}>
            <div className={styles.blockInfo}>
              <div className={styles.info}>
                {dataUser.avatarUrl ? (
                  <img
                    src={dataUser.avatarUrl}
                    alt="avatar"
                    className={styles.ava}
                  />
                ) : (
                  <AvatarIchgram size={28} color="white" />
                )}
                <div className={styles.infoText}>
                  <span className={styles.username}>{dataUser.userName}</span>
                  {postById?.caption}
                </div>
              </div>
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
                <p className={styles.timeInLikeComment}>
                  {postById?.updatedAt && postById?.createdAt
                    ? getRelativeTime(
                        postById.updatedAt !== postById.createdAt
                          ? postById.updatedAt
                          : postById.createdAt
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
  );
};

export default UserPostModal;
