import styles from "./PrivacyPage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";

const PrivacyPage = () => (
  <section className={styles.privacy}>
    <div className={styles.header}>
      <img src={ichgramLogo} alt="ichgram logo" />
      <h2>Privacy Policy</h2>
    </div>
    <div className={styles.content}>
      <p>Effective date: July 31, 2025</p>

      <h3>Introduction</h3>
      <p>This Privacy Policy explains how we collect, use, and protect your personal data when you use Ichgram.</p>

      <h3>Information We Collect</h3>
      <ul>
        <li>Email, username, and profile details</li>
        <li>Usage data: IP address, device type, browser, and app activity</li>
      </ul>

      <h3>How We Use Your Data</h3>
      <p>We use your data to manage your account, deliver content, improve the app, and comply with legal requirements.</p>

      <h3>Legal Basis</h3>
      <p>We process your data under your consent, contractual necessity, or our legitimate interests in providing and securing the service (per GDPR).</p>

      <h3>Third-Party Services</h3>
      <p>We may share limited data with service providers (e.g., Meta, Google Analytics) under strict agreements and data processing rules.</p>

      <h3>Your Rights</h3>
      <ul>
        <li>Access, correct, or delete your data</li>
        <li>Withdraw consent at any time</li>
        <li>Request data portability</li>
        <li>File a complaint with a Data Protection Authority (DPA)</li>
      </ul>

      <h3>Data Security</h3>
      <p>We use industry-standard encryption and safeguards to protect your data. Your data is retained only as long as necessary.</p>

      <h3>Contact</h3>
      <p>If you have questions, contact us at: <br/> 📧 privacy@ichgram.example</p>
    </div>
  </section>
);
export default PrivacyPage;
