import styles from "./NotFoundPage.module.css";
import ichgramBackground from "../../assets/ichgamBackground.png";
const NotFoundPage = () => {
  return (
    <div className={styles.notFoundPage}>
      <div>
        <img
          src={ichgramBackground}
          alt="ichgram background"
          className={styles.imageBackground}
        />
      </div>
      <div className={styles.notFoundMessages}>
        <h2>Oops! Page Not Found (404 Error)</h2>
        <p>
          We're sorry, but the page you're looking for doesn't seem to exist. If
          you typed the URL manually, please double-check the spelling. If you
          clicked on a link, it may be outdated or broken.
        </p>
      </div>
    </div>
  );
};
export default NotFoundPage;
