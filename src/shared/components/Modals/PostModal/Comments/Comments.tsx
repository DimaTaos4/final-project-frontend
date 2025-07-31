import styles from "./Comments.module.css";
import ava from "../../../../../assets/troubleImage.png";
import { LikeIcon } from "../../../icons/index";
const Comments = () => {
  return (
    <div className={styles.commentsBlock}>
      <div className={styles.commentRow}>
        <div className={styles.commentsInfo}>
          <img className={styles.ava} src={ava} alt="" />
          <div className={styles.commentsTextInfo}>
            <div className={styles.commentsText}>
              <span className={styles.username}>profile_name</span>
              <span className={styles.commentText}> вау супер! OMG!</span>
            </div>
            <div className={styles.commentData}>
              <span className={styles.time}>17h.</span>
              <span className={styles.likesInfo}>
                Likes: <span className={styles.numberOfLike}>1</span>
              </span>
            </div>
          </div>
        </div>
        <LikeIcon size={11} />
      </div>

      <div className={styles.commentRow}>
        <div className={styles.commentsInfo}>
          <img className={styles.ava} src={ava} alt="" />
          <div className={styles.commentsTextInfo}>
            <div className={styles.commentsText}>
              <span className={styles.username}>profile_name</span>
              <span className={styles.commentText}> вау супер! OMG!</span>
            </div>
            <div className={styles.commentData}>
              <span className={styles.time}>17h.</span>
              <span className={styles.likesInfo}>
                Likes: <span className={styles.numberOfLike}>1</span>
              </span>
            </div>
          </div>
        </div>
        <LikeIcon size={11} className={styles.likeIcon} />
      </div>
    </div>
  );
};

export default Comments;
