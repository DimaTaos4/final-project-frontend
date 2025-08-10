import styles from "./UserPostModal.module.css";

import { LikeIcon, AvatarIchgram } from "../../../shared/components/icons";
import CommentIcon from "../../../shared/components/icons/CommentIcon";
import AddCommentForm from "../../../shared/components/Modals/PostModal/AddCommentForm/AddCommentForm";
import Comments from "../../../shared/components/Modals/PostModal/Comments/Comments";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { selectPosts } from "../../../redux/posts/post.selector";
import { getPostById } from "../../../redux/posts/post.thunk";
import { getRelativeTime } from "../../../shared/utils/dateUtils";
import useAuth from "../../../shared/hooks/useAuth";
import { Link } from "react-router-dom";
import { likePostApi } from "../../../shared/api/posts/postsRoutes";
import { AxiosError } from "axios";
import type { IPostData } from "../../../shared/api/posts/postsRoutes";

export interface DataUserProps {
  _id: string;
  userName: string;
  avatarUrl?: string;
}

interface PostIdProps {
  postId: string;
  onClose: () => void;
  dataUser: DataUserProps;
}

const UserPostModal = ({ postId, onClose, dataUser }: PostIdProps) => {
  const dispatch = useAppDispatch();
  const { postById } = useSelector(selectPosts);
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [likeError, setLikeError] = useState<AxiosError | null>(null);
  const [localPost, setLocalPost] = useState<IPostData | null>(null);

  const [initialCreatedAt, setInitialCreatedAt] = useState<string | null>(null);
  const [initialUpdatedAt, setInitialUpdatedAt] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getPostById(postId));
    setCurrentIndex(0);
  }, [postId, dispatch]);

  useEffect(() => {
    if (postById) {
      setLocalPost(postById as IPostData);

      if (!initialCreatedAt && !initialUpdatedAt) {
        setInitialCreatedAt(postById.createdAt);
        setInitialUpdatedAt(postById.updatedAt);
      }
    }
  }, [postById, initialCreatedAt, initialUpdatedAt]);

  const images = localPost?.imageUrls || [];
  const hasMultiple = images.length > 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleLike = async (postId: string, token: string) => {
    try {
      const updatedPost = await likePostApi(postId, token);

      setLocalPost((prev) =>
        prev ? { ...prev, likes: updatedPost.likes } : updatedPost
      );
    } catch (error) {
      if (error instanceof AxiosError) setLikeError(error);
    }
  };

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

  if (!localPost || !user || !initialCreatedAt || !initialUpdatedAt)
    return null;

  const displayTime =
    initialUpdatedAt !== initialCreatedAt
      ? getRelativeTime(initialUpdatedAt) + " (edited)"
      : getRelativeTime(initialCreatedAt);

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
              <Link
                to={
                  user.id === dataUser._id
                    ? "/myprofile"
                    : `/user/${dataUser._id}`
                }
              >
                <span className={styles.username}>{dataUser.userName}</span>
              </Link>
            </div>
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
                  <Link
                    to={
                      user.id === dataUser._id
                        ? "/myprofile"
                        : `/user/${dataUser._id}`
                    }
                  >
                    <span className={styles.username}>{dataUser.userName}</span>
                  </Link>
                  {localPost.caption}
                </div>
              </div>
              <span className={styles.time}>{displayTime}</span>
            </div>
            <Comments localPost={localPost} dataUser={dataUser} />
          </div>

          <div className={styles.footerBlockImage}>
            <div className={styles.likeCommentBlock}>
              <div className={styles.likeComment}>
                {localPost.likes?.includes(user.id) ? (
                  <button
                    onClick={() => handleLike(localPost._id, token as string)}
                    className={styles.likeIcon}
                  >
                    <LikeIcon size={21} color="#FF0014" filled />
                  </button>
                ) : (
                  <button
                    className={styles.likeIcon}
                    onClick={() => handleLike(localPost._id, token as string)}
                  >
                    <LikeIcon size={21} />
                  </button>
                )}
                <CommentIcon size={21} color="#fff" />
              </div>
              <div className={styles.imageInfo}>
                <p className={styles.likes}>
                  {localPost.likes?.length || 0} likes
                </p>
                <p className={styles.timeInLikeComment}>{displayTime}</p>
              </div>
            </div>
            <AddCommentForm postId={postId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPostModal;
