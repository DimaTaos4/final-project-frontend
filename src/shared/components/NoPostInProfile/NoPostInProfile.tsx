import styles from "./NoPostInProfile.module.css";
import ichgramLogo from "../../../assets/ichgramLogo.png";

const NoPostInProfile = () => {
  return (
    <div className={styles.noPost}>
      <img src={ichgramLogo} alt="Ichgram logo" className={styles.logo} />
      <h2 className={styles.title}>No Posts Yet</h2>
      <p className={styles.subtitle}>
        When you share photos, they’ll appear on your profile.
      </p>
    </div>
  );
};

export default NoPostInProfile;
