import styles from "./NoChatPage.module.css";
import { Link } from "react-router-dom";
const NoChatPage = () => {
  return (
    <section className={styles.noChat}>
      <h2>Chat not found</h2>
      <p>The chat you're trying to access doesn't exist or was deleted.</p>
      <Link to="/messages" className={styles.backLink}>
        ← Back to messages
      </Link>
    </section>
  );
};
export default NoChatPage;
