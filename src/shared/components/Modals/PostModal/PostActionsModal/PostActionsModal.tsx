import styles from "./PostActionsModal.module.css";
import { useRef, useEffect, useState } from "react";
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
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      console.log(copied);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.postActionModal}>
        <button onClick={handleDeletePost}>Delete</button>
        <button onClick={onEditClick}>Edit</button>
        <button onClick={onClose}>Go to post</button>
        <button onClick={handleCopy} className={styles.copyButton}>
          {copied ? "Copied!" : "Copy link"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default PostActionsModal;
