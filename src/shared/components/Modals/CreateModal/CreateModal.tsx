import styles from "./CreateModal.module.css";
import EmojiIcon from "../../icons/EmojiIcon";
import uploadImage from "../../../../assets/uploadImage.svg";
import { useForm } from "react-hook-form";
import useDataUser from "../../../hooks/useDataUser";
import { useRef, useState, useEffect } from "react";
import { uploadPostsApi } from "../../../api/posts/postsRoutes";
import { AvatarIchgram } from "../../icons/index";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { getAllPosts } from "../../../../redux/posts/post.thunk";
import useAuth from "../../../hooks/useAuth";

const CreateModal = ({ onClose }: { onClose: () => void }) => {
  const { token } = useAuth();
  const dispatch = useAppDispatch();
  const userFromStorage = localStorage.getItem("user");
  const userId = userFromStorage ? JSON.parse(userFromStorage).id : null;
  const { dataUser } = useDataUser(userId);

  const { register, handleSubmit, watch, reset } = useForm();
  const caption = watch("caption") || "";

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const arr = Array.from(selectedFiles);
    setFiles(arr);
    setPreviews(arr.map((file) => URL.createObjectURL(file)));
  };

  const onSubmit = async () => {
    if (!files.length) {
      setError("Please select at least one image.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    formData.append("caption", caption);

    setLoading(true);
    setError(null);

    try {
      await uploadPostsApi(token || "", formData);

      toast.success("Your post has been uploaded!", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "colored",
        hideProgressBar: true,
      });

      dispatch(getAllPosts(token || ""));

      reset();
      setFiles([]);
      setPreviews([]);
      onClose();
    } catch (e) {
      console.error(e);
      setError("Failed to upload post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <form
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.headerModal}>
          <span className={styles.textCreatePost}>Create new post</span>
          <button type="submit" className={styles.btnShare} disabled={loading}>
            {loading ? "Sharing..." : "Share"}
          </button>
        </div>

        <div className={styles.blockUpload}>
          <div className={styles.uploadImage} onClick={handleImageClick}>
            {previews.length > 0 ? (
              <div className={styles.previewGrid}>
                {previews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview-${index}`}
                    className={styles.previewImage}
                  />
                ))}
              </div>
            ) : (
              <img
                src={uploadImage}
                alt="upload image"
                className={styles.uploadIcon}
              />
            )}

            <input
              type="file"
              multiple
              accept="image/*"
              ref={fileInputRef}
              onChange={onFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div className={styles.rideSideImage}>
            <div className={styles.caption}>
              <div className={styles.avaUsername}>
                {dataUser?.avatarUrl ? (
                  <img
                    src={dataUser.avatarUrl}
                    alt="avatar"
                    className={styles.avatar}
                  />
                ) : (
                  <AvatarIchgram size={28} color="white" />
                )}
                <span className={styles.username}>{dataUser?.userName}</span>
              </div>

              <textarea
                {...register("caption", { maxLength: 2200 })}
                placeholder="Write a caption..."
                rows={6}
                style={{
                  border: "none",
                  resize: "none",
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "14px",
                  outline: "none",
                  background: "transparent",
                }}
              />

              <div className={styles.counterSymbols}>
                {caption.length}/2 200
              </div>

              {error && (
                <div
                  style={{
                    color: "#e74c3c",
                    fontSize: "13px",
                    margin: "4px 16px 0 auto",
                    textAlign: "right",
                  }}
                >
                  {error}
                </div>
              )}

              <div className={styles.emoji}>
                <EmojiIcon size={20} />
              </div>
            </div>

            <div className={styles.underRightBlock}></div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateModal;
