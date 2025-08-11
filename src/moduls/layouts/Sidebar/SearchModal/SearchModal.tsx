import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { AxiosError } from "axios";

import styles from "./SearchModal.module.css";
import { AvatarIchgram } from "../../../../shared/components/icons";
import { searchUsersApi } from "../../../../shared/api/users/usersRoutes";
import type { IRegisterData } from "../../../../shared/api/users/usersRoutes";
import Loader from "../../../../shared/components/Loader/Loader";

type Props = {
  onClose: () => void;
};

const SearchModal = ({ onClose }: Props) => {
  const [userValue, setUserValue] = useState("");
  const [users, setUsers] = useState<IRegisterData[] | null>(null);
  const [recentUsers, setRecentUsers] = useState<IRegisterData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user") || "null");
  const currentUserId = currentUser?._id;
  const recentKey = currentUserId ? `recentUsers_${currentUserId}` : null;

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Fetch recent users from localStorage
  useEffect(() => {
    if (!recentKey) return;
    const stored = localStorage.getItem(recentKey);
    if (stored) {
      setRecentUsers(JSON.parse(stored));
    }
  }, [recentKey]);

  // Debounced user search
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (userValue.trim() === "") {
        setUsers(null);
        return;
      }

      try {
        setIsLoading(true);
        const foundUsers = await searchUsersApi(userValue);
        setUsers(foundUsers);
      } catch (err) {
        if (err instanceof AxiosError) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [userValue]);

  // Save updated recent users to localStorage
  const saveRecentToStorage = (updated: IRegisterData[]) => {
    if (recentKey) {
      localStorage.setItem(recentKey, JSON.stringify(updated));
    }
  };

  const addToRecentUsers = (userToAdd: IRegisterData) => {
    let updated = recentUsers.filter((u) => u._id !== userToAdd._id);
    updated.unshift(userToAdd);
    updated = updated.slice(0, 10);
    setRecentUsers(updated);
    saveRecentToStorage(updated);
  };

  const handleRemoveRecent = (id: string) => {
    const updated = recentUsers.filter((u) => u._id !== id);
    setRecentUsers(updated);
    saveRecentToStorage(updated);
  };

  const handleUserClick = (userResult: IRegisterData) => {
    addToRecentUsers(userResult);

    if (currentUserId === userResult._id) {
      navigate("/myprofile");
    } else {
      navigate(`/user/${userResult._id}`);
    }

    onClose();
  };

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

        {/* Recent Users */}
        {currentUserId && recentUsers.length > 0 && (
          <>
            <p className={styles.recentText}>Recent</p>
            <div className={styles.profileRecent}>
              {recentUsers
                .filter((u) => u._id !== currentUserId)
                .map((recentUser) => (
                  <div
                    className={styles.profile}
                    key={recentUser._id}
                    onClick={() => handleUserClick(recentUser)}
                  >
                    {recentUser.avatarUrl ? (
                      <img
                        className={styles.avaProfile}
                        src={recentUser.avatarUrl}
                        alt="avatar"
                      />
                    ) : (
                      <AvatarIchgram size={38} color="white" />
                    )}
                    <span className={styles.username}>
                      {recentUser.userName}
                    </span>
                    <FaTimes
                      className={styles.removeIcon}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveRecent(recentUser._id);
                      }}
                    />
                  </div>
                ))}
            </div>
          </>
        )}

        {/* Error */}
        {error && (
          <p className={styles.errorText}>
            {error.message || "Error while searching"}
          </p>
        )}

        {/* Search Results */}
        {users && users.length > 0 ? (
          <div className={styles.profileRecent}>
            {users.map((userResult) => (
              <div
                className={styles.profile}
                key={userResult._id}
                onClick={() => handleUserClick(userResult)}
              >
                {userResult.avatarUrl ? (
                  <img
                    className={styles.avaProfile}
                    src={userResult.avatarUrl}
                    alt="avatar"
                  />
                ) : (
                  <AvatarIchgram size={38} color="white" />
                )}
                <span className={styles.username}>{userResult.userName}</span>
              </div>
            ))}
          </div>
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
