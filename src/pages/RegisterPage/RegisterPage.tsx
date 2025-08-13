import styles from "./RegisterPage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";
import Form from "../../shared/components/Form/Form";
import Button from "../../shared/components/Button/Button";
import type { FormField } from "../../shared/components/Form/Form";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { registerUser } from "../../redux/users/users.thunk";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/users.selector";
import { useEffect } from "react";

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useSelector(selectUsers);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const timeout = setTimeout(() => {
      navigate("/verify-email");
    }, 2000);

    return () => clearTimeout(timeout);
  }, [user, navigate]);

  const fields: FormField[] = ["email", "fullName", "userName", "password"];

  const handleRegister = async (values: Record<FormField, string>) => {
    await dispatch(registerUser(values));
  };

  return (
    <section className={styles.registerPage}>
      <div className={styles.registerBlock}>
        <img src={ichgramLogo} alt="ichgram logo" />

        <p className={styles.infoSignUp}>
          Sign up to see photos and videos from your friends.
        </p>

        <div className={styles.divForm}>
          <Form
            formId="register-form"
            className={styles.form}
            inputClassName={styles.input}
            errorClassName={styles.error}
            fields={fields}
            onSubmit={handleRegister}
          />
        </div>

        <p className={styles.info1}>
          People who use our service may have uploaded{" "}
          <span>
            your contact information to Instagram.{" "}
            <a href="/learn-more">Learn More</a>
          </span>
        </p>

        <div className={styles.info2}>
          <p>
            By signing up, you agree to our <a href="/legal/terms">Terms</a>,
            <a href="/legal/privacy"> Privacy Policy</a> and
            <a href="/legal/cookies"> Cookies Policy</a>
          </p>
        </div>

        <Button
          type="submit"
          form="register-form"
          className={clsx(
            styles.btnSignUp,
            loading && styles.btnLoading,
            user && styles.btnRegistered
          )}
          disabled={loading || !!user}
        >
          {user ? "Registered!" : loading ? "Signing up..." : "Sign up"}
        </Button>
      </div>

      <div className={styles.blockLinkToLogIn}>
        <span>Have an account?</span>
        <span>
          <a href="/login">Log in</a>
        </span>
      </div>
    </section>
  );
};

export default RegisterPage;
