import ReactDOM from "react-dom";
import styles from "./EditPostModal.module.css";
import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ichgramBackground from "../../../../assets/ichgamBackground.png";
import uploadImage from "../../../../assets/uploadImage.svg";
import { useSelector } from "react-redux";
import { selectPosts } from "../../../../redux/posts/post.selector";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { updatePostById } from "../../../../redux/posts/post.thunk";
import useAuth from "../../../hooks/useAuth";
import { EmojiIcon } from "../../icons/index";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";

interface EditModalProps {
  onClose: () => void;
}

const EditPostModal = ({ onClose }: EditModalProps) => {
  const { postById } = useSelector(selectPosts);
  const dispatch = useAppDispatch();
  const { token } = useAuth();

  const modalRef = useRef<HTMLFormElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const { register, handleSubmit, reset, setValue, watch } = useForm<{
    caption: string;
  }>({
    defaultValues: {
      caption: "",
    },
  });

  const caption = watch("caption") || "";

  useEffect(() => {
    if (postById) {
      setValue("caption", postById.caption || "");
    }
  }, [postById, setValue]);

  useEffect(() => {
    if (files.length === 0) {
      setFilePreviews([]);
      return;
    }

    const newPreviews: string[] = [];
    let loaded = 0;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews[index] = reader.result as string;
        loaded++;
        if (loaded === files.length) {
          setFilePreviews(newPreviews);
          setCurrentIndex(0);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [files]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    const handleClickOutsideModal = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutsideModal);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideModal);
  }, [onClose]);

  if (!postById) return null;

  const postImages = postById.imageUrls || [];
  const currentImages = filePreviews.length > 0 ? filePreviews : postImages;
  const hasMultiple = currentImages.length > 1;
  const shownImage = currentImages[currentIndex] || ichgramBackground;

  const handlePrev = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );

  const handleNext = () =>
    setCurrentIndex((prev) =>
      prev === currentImages.length - 1 ? 0 : prev + 1
    );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles(Array.from(e.target.files));
  };

  const onSubmit = async (data: { caption: string }) => {
    const formData = new FormData();
    formData.append("caption", data.caption);
    files.forEach((file) => formData.append("images", file));

    if (!token) return;

    try {
      const resultAction = await dispatch(
        updatePostById({ id: postById._id, token, formData })
      );

      if (updatePostById.fulfilled.match(resultAction)) {
        reset();
        setFiles([]);
        setFilePreviews([]);
        setCurrentIndex(0);
        onClose();
      } else {
        console.error("Ошибка при обновлении поста", resultAction);
      }
    } catch (err) {
      console.error("Ошибка при отправке", err);
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    setValue("caption", caption + emoji);
  };

  return ReactDOM.createPortal(
    <div className={styles.overlay}>
      <form
        ref={modalRef}
        className={styles.modalEdit}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.headerEdit}>
          <span className={styles.editName}>Edit post</span>
          <button type="submit" className={styles.btnSave}>
            Save
          </button>
        </div>

        <div className={styles.blockEdit}>
          <div className={styles.image}>
            <img
              className={styles.imageAddress}
              src={shownImage}
              alt="preview"
            />

            {hasMultiple && (
              <>
                <button
                  type="button"
                  className={styles.prevBtn}
                  onClick={handlePrev}
                >
                  ‹
                </button>
                <button
                  type="button"
                  className={styles.nextBtn}
                  onClick={handleNext}
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className={styles.addText}>
            <textarea
              className={styles.textareaCaption}
              placeholder="Edit a caption..."
              {...register("caption")}
              rows={6}
              style={{ resize: "none" }}
            />

            <div className={styles.editImages} style={{ position: "relative" }}>
              <label className={styles.customFileUpload}>
                <input type="file" multiple onChange={onFileChange} />
                <img src={uploadImage} alt="upload" />
              </label>

              <button
                type="button"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                className={styles.btnEmoji}
                aria-label="Toggle emoji picker"
              >
                <EmojiIcon size={20} />
              </button>

              {showEmojiPicker && (
                <div ref={emojiPickerRef} className={styles.emojiBlock}>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>,
    document.getElementById("modal-root")!
  );
};

export default EditPostModal;
