import styles from "./Footer.module.css";
import sidebarMenu from "../Sidebar/SidebarMenu/SidebarMenu";
import { Link } from "react-router-dom";

const Footer = () => {
  const element = sidebarMenu.map((menu) => (
    <Link key={menu.id} className={styles.footerItem} to={menu.toPage}>
      {menu.text}
    </Link>
  ));

  return (
    <footer className={styles.footer}>
      <div className={styles.footerBlock}>
        <ul className={styles.footerMenu}>{element}</ul>
        <p className={styles.footerInfo}>© 2025 ICHgram</p>
      </div>
    </footer>
  );
};
export default Footer;
