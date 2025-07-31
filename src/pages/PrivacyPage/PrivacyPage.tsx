import styles from "./PrivacyPage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";
const PrivacyPage = () => {
  return (
    <section className={styles.privacy}>
      <div>
        <img src={ichgramLogo} alt="ichgram logo" />
      </div>
    </section>
  );
};
export default PrivacyPage;
