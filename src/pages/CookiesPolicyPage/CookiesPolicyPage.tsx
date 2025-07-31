import styles from "./CookiesPolicyPage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";

const CookiesPolicyPage = () => (
  <section className={styles.cookiesPolicy}>
    <div className={styles.header}>
      <img src={ichgramLogo} alt="ichgram logo" />
      <h2>Cookies Policy</h2>
    </div>
    <div className={styles.content}>
      <p>Last updated: July 31, 2025</p>
      <p>
        We use cookies — small text files stored on your device — to improve
        functionality, remember your preferences, and enhance your experience on
        Ichgram.
      </p>

      <h3>What are cookies?</h3>
      <p>
        Cookies help recognize returning users, save settings, and support
        personalized features.
      </p>

      <h3>How we use cookies</h3>
      <ul>
        <li>
          <strong>Essential</strong>: For login sessions, account security, and
          navigation.
        </li>
        <li>
          <strong>Analytics</strong>: To measure performance, page views, and
          user flow (e.g. via Google Analytics).
        </li>
        <li>
          <strong>Optional</strong>: For social media features and marketing
          tools (only with your consent).
        </li>
      </ul>

      <h3>How to manage cookies</h3>
      <p>
        You can disable non-essential cookies in your browser settings. Some
        features may not work properly without them.
      </p>
    </div>
  </section>
);
export default CookiesPolicyPage;
