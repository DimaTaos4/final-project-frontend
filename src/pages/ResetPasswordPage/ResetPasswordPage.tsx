import styles from "./ResetPasswordPage.module.css";
import { useForm } from "react-hook-form";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPasswordApi } from "../../shared/api/users/usersRoutes";
import ichgramLogo from "../../assets/ichgramLogo.png";
import clsx from "clsx";
import { AxiosError } from "axios";

type FormData = {
  newPassword: string;
  confirmPassword: string;
  token: string;
};

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      if (!token) {
        setMessage("Invalid or missing token.");
        return;
      }

      await resetPasswordApi({
        newPassword: data.newPassword,
        repeatNewPassword: data.confirmPassword,
        token: token!,
      });

      setIsSuccess(true);
      setMessage("Password successfully changed. Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Something went wrong");
      }
    }
  };

  return (
    <section className={styles.resetPage}>
      <div className={styles.resetBlock}>
        <img src={ichgramLogo} alt="ichgram logo" />

        <p className={styles.infoReset}>
          Enter your new password to reset your account.
        </p>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <input
            className={styles.input}
            type="password"
            placeholder="New password"
            {...register("newPassword", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\S]+$/,
                message:
                  "Password must contain at least 1 letter, 1 number, and 1 special character",
              },
            })}
          />
          {errors.newPassword && (
            <p className={styles.error}>{errors.newPassword.message}</p>
          )}

          <input
            className={styles.input}
            type="password"
            placeholder="Repeat your password"
            {...register("confirmPassword", {
              required: "Please repeat your password",
              validate: (value) =>
                value === watch("newPassword") || "Passwords do not match",
            })}
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}

          <button
            type="submit"
            className={clsx(styles.btnReset, {
              [styles.btnLoading]: isSubmitting,
            })}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className={styles.loader}></span>
            ) : (
              "Reset Password"
            )}
          </button>

          {message && (
            <p
              className={clsx(styles.status, {
                [styles.success]: isSuccess,
                [styles.errorStatus]: !isSuccess,
              })}
            >
              {message}
            </p>
          )}
        </form>
      </div>

      <div className={styles.blockLinkToLogIn}>
        <span>Remembered your password?</span>
        <span>
          <Link to="/login">Log in</Link>
        </span>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
