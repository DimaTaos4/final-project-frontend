import styles from "./PostActionsModal.module.css";
import { useRef, useEffect } from "react";
import type { IPostData } from "../../../../api/posts/postsRoutes";

interface PostActionsModalProps {
  onClose: () => void;
  post: IPostData;
  onPostDeleted: (id: string) => void;
  onEditClick: () => void;
}
const PostActionsModal = ({
  onClose,
  post,
  onPostDeleted,
  onEditClick,
}: PostActionsModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
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
  }, [onClose]);

  const handleDeletePost = () => {
    onPostDeleted(post._id);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.postActionModal}>
        <button onClick={handleDeletePost}>Delete</button>
        <button onClick={onEditClick}>Edit</button>
        <button>Go to post</button>
        <button>Copy link</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PostActionsModal;
