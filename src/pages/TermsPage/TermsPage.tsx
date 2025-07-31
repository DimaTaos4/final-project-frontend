import styles from "./TermsPage.module.css";
import ichgramLogo from "../../assets/ichgramLogo.png";
const TermsPage = () => {
  return (
    <section className={styles.terms}>
      <div>
        <img src={ichgramLogo} alt="ichgram logo" />
      </div>
    </section>
  );
};
export default TermsPage;
