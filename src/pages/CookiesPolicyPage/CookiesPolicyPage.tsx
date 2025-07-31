import styles from "./CookiesPolicyPage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";
const CookiesPolicyPage = () => {
  return (
    <section className={styles.coockiesPolicy}>
      <div>
        <img src={ichgramLogo} alt="ichgram logo" />
      </div>
    </section>
  );
};
export default CookiesPolicyPage;
