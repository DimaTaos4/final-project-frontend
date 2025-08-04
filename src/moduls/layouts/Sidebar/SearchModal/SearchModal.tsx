import styles from "./SearchModal.module.css";
import { AvatarIchgram } from "../../../../shared/components/icons";

import { searchUsersApi } from "../../../../shared/api/users/usersRoutes";

import { useEffect, useState } from "react";

import type { IRegisterData } from "../../../../shared/api/users/usersRoutes";

import Loader from "../../../../shared/components/Loader/Loader";

import { useNavigate } from "react-router-dom";


type Props = {
  onClose: () => void;
};

const SearchModal = ({ onClose }: Props) => {
  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const [userValue, setUserValue] = useState("");
  const [users, setUsers] = useState<null | IRegisterData[]>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") as string);

  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        if (userValue.trim() !== "") {
          setIsLoading(true);
          const users = await searchUsersApi(userValue);
          setUsers(users);
        } else {
          setUsers(null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [userValue]);
  const element = users?.map((userResult) => (
    <div
      className={styles.profile}
      key={userResult.email}
      onClick={() => {
        if (user && user.id === userResult._id) {
          navigate("/myprofile");
        } else {
          navigate(`/user/${userResult._id}`);
        }

        onClose();
      }}
    >
      {userResult.avatarUrl ? (
        <img
          className={styles.avaProfile}
          src={userResult.avatarUrl}
          alt="avatar"
        />
      ) : (
        <AvatarIchgram size={38} color="white" className="avatarImage" />
      )}
      <span className={styles.username}>{userResult.userName}</span>
    </div>
  ));

  return (
    <div className={styles.overlay} onClick={handleClickOutside}>
      <div className={styles.searchModal}>
        <h2 className={styles.searchTitle}>Search</h2>
        <form className={styles.searchForm}>
          <input
            className={styles.input}
            type="text"
            placeholder="Search"
            value={userValue}
            onChange={(e) => setUserValue(e.target.value)}
          />
        </form>
        <p className={styles.recentText}>Recent</p>
        {users && users.length > 0 ? (
          <div className={styles.profileRecent}>{element}</div>
        ) : userValue.trim() !== "" ? (
          <p className={styles.noResults}>No results found for "{userValue}"</p>
        ) : (
          <p className={styles.recentTextExp}>Enter a user name ...</p>
        )}
        {isLoading && <Loader loading={isLoading} />}
      </div>
    </div>
  );
};

export default SearchModal;
