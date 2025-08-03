import { useState } from "react";
import styles from "./ResetPage.module.css";

import troubleImage from "../../assets/troubleImage.png";
import { AxiosError } from "axios";
import Form from "../../shared/components/Form/Form";
import type { FormField } from "../../shared/components/Form/Form";
import Button from "../../shared/components/Button/Button";

import { requestResetPassApi } from "../../shared/api/users/usersRoutes";

const ResetPage = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fields: FormField[] = ["email"];

  const handleAddEmail = async (values: Record<FormField, string>) => {
    setIsLoading(true);
    setMessage(null);
    try {
      const response = await requestResetPassApi(values.email);
      setMessage(
        response.message || "Check your email for reset instructions."
      );
      setIsError(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      setMessage(
        error?.response?.data?.message ||
          "Something went wrong. Please try again."
      );
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.troublePage}>
      <div>
        <img src={troubleImage} alt="Trouble image" />
      </div>

      <h2>Trouble logging in?</h2>

      <p className={styles.infoIfTrouble}>
        Enter your email, phone, or username and we'll send you a link to get
        back into your account.
      </p>

      <Form
        className={styles.form}
        inputClassName={styles.input}
        errorClassName={styles.error}
        fields={fields}
        onSubmit={handleAddEmail}
        submitText="Reset your password"
        button={
          <Button
            type="submit"
            className={styles.btnReset}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset your password"}
          </Button>
        }
      />

      {message && (
        <p className={isError ? styles.errorMessage : styles.successMessage}>
          {message}
        </p>
      )}

      <div className={styles.orForgetPass}>
        <span></span>
        OR
        <span></span>
      </div>

      <a className={styles.createNewAcc} href="/register">
        Create new account
      </a>
      <a className={styles.backToLogin} href="/login">
        Back to login
      </a>
    </section>
  );
};

export default ResetPage;
