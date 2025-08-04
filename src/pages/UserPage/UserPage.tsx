import styles from "./UserPage.module.css";

import UserPagePublications from "./UserPagePublications/UserPagePublications";

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getUserById } from "../../redux/users/users.thunk";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/users.selector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import Loader from "../../shared/components/Loader/Loader";
import { AvatarIchgram } from "../../shared/components/icons/index";
const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { user: dataUser, loading, error } = useSelector(selectUsers);

  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className={styles.loadingPosts}>
        <Loader loading={loading} />
      </div>
    );
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <section className={styles.userPage}>
      <div className={styles.descriptionBlock}>
        <div className={styles.blockImage}>
          {dataUser?.avatarUrl ? (
            <img
              src={dataUser?.avatarUrl}
              alt="avatar"
              className={styles.imageAva}
            />
          ) : (
            <AvatarIchgram size={150} color="white" className="avatarImage" />
          )}
        </div>
        <div className={styles.infoActionBlock}>
          <div className={styles.actionPart}>
            <span className={styles.username}>{dataUser?.userName}</span>
            <button className={styles.followBtn}>Follow</button>
            <button className={styles.messageBtn}>Message</button>
          </div>
          <div className={styles.infoAboutUser}>
            <p>
              <span className={styles.count}>0</span> posts
            </p>
            <p>
              <span className={styles.count}>{dataUser?.followers.length}</span>{" "}
              followers
            </p>
            <p>
              <span className={styles.count}>{dataUser?.following.length}</span>{" "}
              following
            </p>
          </div>
          <p className={styles.textAboutUser}>{dataUser?.bio}</p>
          <a href="/" className={styles.link}>
            {dataUser?.link}
          </a>
        </div>
      </div>
      <UserPagePublications />
    </section>
  );
};
export default UserPage;
