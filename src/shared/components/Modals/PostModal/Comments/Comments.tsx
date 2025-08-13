import styles from "./Comments.module.css";
import { LikeIcon } from "../../../icons/index";
import type { IPostData } from "../../../../api/posts/postsRoutes";
import { AvatarIchgram } from "../../../icons/index";
import { getRelativeTime } from "../../../../utils/dateUtils";

interface CommentsProps {
  localPost: IPostData;
}

const Comments = ({ localPost }: CommentsProps) => {
  if (!localPost || !localPost.comments) return null;
  console.log(localPost);
  console.log(localPost.comments);

  return (
    <div className={styles.commentsBlock}>
      {localPost.comments.map((comment) => {
        const user = comment.user;
        if (typeof user === "string") return null;
        return (
          <div key={comment._id} className={styles.commentRow}>
            <div className={styles.commentsInfo}>
              {user && user.avatarUrl ? (
                <img className={styles.ava} src={user.avatarUrl} alt="avatar" />
              ) : (
                <AvatarIchgram
                  size={28}
                  color="white"
                  className="avatarImage"
                />
              )}
              <div className={styles.commentsTextInfo}>
                <div className={styles.commentsText}>
                  <span className={styles.username}>{user.userName}</span>
                  <span className={styles.commentText}>{comment.text}</span>
                </div>
                <div className={styles.commentData}>
                  <span className={styles.time}>
                    {getRelativeTime(comment.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <LikeIcon size={11} />
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
