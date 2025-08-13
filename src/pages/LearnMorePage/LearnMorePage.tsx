import styles from "./LearnMorePage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";

const LearnMorePage = () => (
  <section className={styles.learnMore}>
    <div className={styles.header}>
      <img src={ichgramLogo} alt="ichgram logo" />
      <h2>Learn More</h2>
    </div>
    <div className={styles.content}>
      <p>Last updated: August 13, 2025</p>

      <p>
        Some people who use Ichgram may have uploaded your contact information,
        such as your phone number or email address. This helps improve our
        service by making it easier for users to connect with friends and people
        they may know.
      </p>

      <h3>How is contact info used?</h3>
      <p>We use uploaded contact information to:</p>
      <ul>
        <li>Help users find friends more easily</li>
        <li>Suggest connections based on mutual contacts</li>
        <li>Improve safety and reduce fake accounts</li>
      </ul>

      <h3>Where did we get it?</h3>
      <p>
        If a friend has your contact saved on their device and gave permission
        to sync their contacts with Ichgram, your info may have been uploaded.
      </p>

      <h3>Your choices</h3>
      <p>
        We respect your privacy. Contact information is used in accordance with
        our <a href="/legal/privacy">Privacy Policy</a>.
      </p>
    </div>
  </section>
);

export default LearnMorePage;
