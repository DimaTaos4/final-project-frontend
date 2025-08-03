import styles from "./VerifyEmailPage.module.css";
import { EmailIcon } from "../../shared/components/icons/index";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/users.selector";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { getUserById } from "../../redux/users/users.thunk";
import { resendVerificationApi } from "../../shared/api/users/usersRoutes";
import { AxiosError } from "axios";

const VerifyEmailPage = () => {
  const { user } = useSelector(selectUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [resendMessage, setResendMessage] = useState<string | null>(null);
  const [resendError, setResendError] = useState<string | null>(null);

  const query = new URLSearchParams(location.search);
  const emailVerifiedSuccessfully = query.get("success") === "true";

  useEffect(() => {
    if (user && typeof user !== "string" && user.id) {
      dispatch(getUserById(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && typeof user !== "string" && user.isVerified) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleResend = async () => {
    if (!user || typeof user === "string" || !user.email) return;

    try {
      const res = await resendVerificationApi(user.email);
      setResendMessage(res.message);
      setResendError(null);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setResendMessage(null);
      setResendError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section className={styles.verifyPage}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <EmailIcon size={48} />
        </div>

        {emailVerifiedSuccessfully ? (
          <>
            <h2>Email verified</h2>
            <p>Your email has been successfully verified ✅</p>
            <Link to="/login" className={styles.backToLogin}>
              Continue to Login
            </Link>
          </>
        ) : (
          <>
            <h2>Check your email</h2>
            <p>
              We’ve sent a verification link to your email. Please check your
              inbox and click the link to verify your account.
            </p>

            <p className={styles.secondaryText}>
              Didn’t get the email?{" "}
              <button onClick={handleResend} className={styles.resendButton}>
                Resend
              </button>
            </p>

            {resendMessage && (
              <p className={styles.successMessage}>{resendMessage}</p>
            )}
            {resendError && (
              <p className={styles.errorMessage}>{resendError}</p>
            )}

            <Link to="/login" className={styles.backToLogin}>
              Back to login
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

export default VerifyEmailPage;
