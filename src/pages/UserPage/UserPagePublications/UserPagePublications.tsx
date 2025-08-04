import styles from "./UserPagePublications.module.css";
import image from "../../../assets/ichgamBackground.png";
const UserPagePublications = () => {
  return (
    <section className={styles.userPublications}>
      <div className={styles.imageContainer}>
        <img src={image} alt="image" />
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt="image" />
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt="image" />
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt="image" />
      </div>
    </section>
  );
};
export default UserPagePublications;
