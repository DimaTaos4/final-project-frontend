import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { IchgramIcon, AvatarIchgram } from "../../../shared/components/icons";
import sidebarMenu from "./SidebarMenu/SidebarMenu";
import useDataUser from "../../../shared/hooks/useDataUser";

type SidebarProps = {
  onOpenModal: () => void;
};

const Sidebar = ({ onOpenModal }: SidebarProps) => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const { dataUser, loadingUser, errorUser } = useDataUser(user?.id);

  const element = sidebarMenu.map((menu) => {
    if (menu.toPage) {
      return (
        <NavLink key={menu.id} to={menu.toPage} className={styles.iconMenu}>
          {menu.icon}
          <span>{menu.text}</span>
        </NavLink>
      );
    }

    if (menu.isModal && menu.text === "Create") {
      return (
        <button
          key={menu.id}
          className={styles.iconMenu}
          onClick={onOpenModal}
          type="button"
        >
          {menu.icon}
          <span>{menu.text}</span>
        </button>
      );
    }

    return (
      <button key={menu.id} className={styles.iconMenu}>
        {menu.icon}
        <span>{menu.text}</span>
      </button>
    );
  });

  return (
    <nav className={styles.sidebar}>
      <a href="/" className={styles.ichgramIcon}>
        <IchgramIcon size={97} />
      </a>

      <ul className={styles.iconsMenu}>
        {element}
        <p className={styles.iconMenu}>
          <span></span>
        </p>
      </ul>

      {loadingUser && <p className={styles.loading}>Loading user...</p>}
      {errorUser && <p className={styles.error}>Ошибка загрузки профиля</p>}

      {!loadingUser && dataUser && (
        <NavLink to="/myprofile" className={styles.profileClass}>
          {dataUser.avatarUrl ? (
            <img
              className={styles.avatar}
              src={dataUser.avatarUrl}
              alt="avatar"
            />
          ) : (
            <AvatarIchgram size={24} color="white" className="avatarImage" />
          )}
          Profile
        </NavLink>
      )}
    </nav>
  );
};

export default Sidebar;
