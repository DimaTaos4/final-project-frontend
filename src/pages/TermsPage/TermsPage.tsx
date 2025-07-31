import styles from "./TermsPage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";

const TermsPage = () => (
  <section className={styles.terms}>
    <div className={styles.header}>
      <img src={ichgramLogo} alt="ichgram logo" />
      <h2>Terms of Service</h2>
    </div>
    <div className={styles.content}>
      <p>Effective date: July 31, 2025</p>

      <h3>1. Acceptance of Terms</h3>
      <p>
        By using Ichgram, you agree to these Terms of Service. If you do not
        agree, please stop using the service.
      </p>

      <h3>2. User Accounts</h3>
      <p>
        You must be at least 16 years old to create an account. You are
        responsible for keeping your login details confidential.
      </p>

      <h3>3. User Content</h3>
      <p>
        You own your content, but you grant us a license to display it within
        the app. Content must not violate laws or others’ rights.
      </p>

      <h3>4. Prohibited Conduct</h3>
      <ul>
        <li>No spam, abuse, hate speech, or illegal content</li>
        <li>No bots or scraping without permission</li>
        <li>No impersonation or misleading behavior</li>
      </ul>

      <h3>5. Termination</h3>
      <p>
        We may suspend or delete accounts that violate these terms or our
        community guidelines.
      </p>

      <h3>6. Limitation of Liability</h3>
      <p>
        We are not responsible for user content or third-party actions. The
        service is provided “as-is.”
      </p>

      <h3>7. Governing Law</h3>
      <p>
        These Terms are governed by the laws of Germany. Disputes will be
        resolved in German courts.
      </p>
    </div>
  </section>
);
export default TermsPage;
