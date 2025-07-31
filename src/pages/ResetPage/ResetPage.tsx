import styles from "./ResetPage.module.css";

import troubleImage from "../../assets/troubleImage.png";

import Form from "../../shared/components/Form/Form";

import type { FormField } from "../../shared/components/Form/Form";

import Button from "../../shared/components/Button/Button";

const ResetPage = () => {
  const fields: FormField[] = ["email"];
  const handleAddEmail = (values: Record<FormField, string>) => {
    console.log("email", values);
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
          <Button type="submit" className={styles.btnReset}>
            Reset your password
          </Button>
        }
      />
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
