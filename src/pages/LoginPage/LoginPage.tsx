import styles from "./LoginPage.module.css";

import ichgramBackground from "../../assets/ichgamBackground.png";
import ichgramLogo from "../../assets/ichgramLogo.png";

import Button from "../../shared/components/Button/Button";

import Form from "../../shared/components/Form/Form";
import type { FormField } from "../../shared/components/Form/Form";

import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { loginUser, getAllUsers } from "../../redux/users/users.thunk";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const fields: FormField[] = ["email", "password"];

  const handleLogin = async (values: Record<FormField, string>) => {
    await dispatch(loginUser(values));
    dispatch(getAllUsers());
  };

  return (
    <div className={styles.loginPage}>
      <img
        src={ichgramBackground}
        alt="background"
        className={styles.imageBackground}
      />
      <div className={styles.blocksForm}>
        <div className={styles.blockForm1}>
          <img src={ichgramLogo} alt="logo" />

          <Form
            className={styles.form}
            inputClassName={styles.input}
            errorClassName={styles.error}
            buttonClassName={styles.btnLogIn}
            fields={fields}
            onSubmit={handleLogin}
            submitText="Log In"
            button={
              <Button type="submit" className={styles.btnLogIn}>
                Log In
              </Button>
            }
          />

          <div className={styles.orForgetPass}>
            <span></span>
            OR
            <span></span>
          </div>
          <a className={styles.forgotPassport} href="/reset">
            Forgot password?
          </a>
        </div>

        <div className={styles.blockLinkToSignUp}>
          <span>Don't have an account?</span>
          <span>
            <a href="/register">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
