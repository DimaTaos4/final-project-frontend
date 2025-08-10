import styles from "./AddCommentForm.module.css";
import { useForm } from "react-hook-form";
import { EmojiIcon } from "../../../icons/index";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import { useState, useRef, useEffect } from "react";
import { commentPostApi } from "../../../../api/posts/postsRoutes";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { getPostById } from "../../../../../redux/posts/post.thunk";

interface FormData {
  commentText: string;
}
interface PostIdProps {
  postId: string;
}
const AddCommentForm = ({ postId }: PostIdProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const [postData, setPostData] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();
  const onSubmit = async (value: FormData) => {
    try {
      const data = await commentPostApi(
        postId,
        value.commentText,
        token as string
      );
      setPostData(data);
      reset();
      dispatch(getPostById(postId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(postData);
  }, [postData]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const emoji = emojiData.emoji;
    const input = inputRef.current;

    if (input) {
      const start = input.selectionStart || 0;
      const end = input.selectionEnd || 0;
      const text = input.value;
      const newText = text.substring(0, start) + emoji + text.substring(end);

      input.value = newText;

      input.dispatchEvent(new Event("input", { bubbles: true }));

      setTimeout(() => {
        input.setSelectionRange(start + emoji.length, start + emoji.length);
        input.focus();
      }, 0);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node)
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

  return (
    <>
      <form
        className={styles.commentForm}
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }
        }}
      >
        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <EmojiIcon size={20} color="#000" />
          </button>

          {showEmojiPicker && (
            <div
              ref={emojiPickerRef}
              style={{ position: "absolute", bottom: "30px", zIndex: 10 }}
            >
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>

        <input
          {...register("commentText", {
            required: "To add comment please write something",
          })}
          ref={(el) => {
            register("commentText").ref(el);
            inputRef.current = el;
          }}
          className={styles.input}
          type="text"
          placeholder="Add comment"
          autoFocus={!!errors.commentText}
        />

        <button type="submit" className={styles.btnSend}>
          Send
        </button>
      </form>

      {errors.commentText && (
        <p className={styles.error}>{errors.commentText.message}</p>
      )}
    </>
  );
};

export default AddCommentForm;
