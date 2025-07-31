import styles from "./AddCommentForm.module.css";
import { useForm } from "react-hook-form";
import { EmojiIcon } from "../../../icons/index";

interface FormData {
  commentText: string;
}

const AddCommentForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (value: FormData) => {
    console.log(value.commentText);
    reset();
  };

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
        <EmojiIcon size={20} color="#000" />
        <input
          className={styles.input}
          {...register("commentText", {
            required: "To add comment please write something",
          })}
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
