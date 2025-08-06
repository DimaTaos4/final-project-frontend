import styles from "./UserPage.module.css";
import type { Post } from "./UserPagePublications/UserPagePublications";
import UserPagePublications from "./UserPagePublications/UserPagePublications";
import { getPostsByIdUser } from "../../shared/api/posts/postsRoutes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/profile/profile.thunk";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/users.selector";
import { selectProfile } from "../../redux/profile/profile.selector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import Loader from "../../shared/components/Loader/Loader";
import { AvatarIchgram } from "../../shared/components/icons/index";
import UserPostModal from "./UserPostModal/UserPostModal";
import { followUser } from "../../redux/users/users.thunk";

const UserPage = () => {
  const [isUserModalOpened, setIsUserModalOpened] = useState(false);
  const [postId, setPostId] = useState("");
  const onOpenUserModal = (postId: string) => {
    setIsUserModalOpened(true);
    setPostId(postId);
  };
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { user } = useSelector(selectUsers);
  useEffect(() => {
    console.log(user);
  }, [user]);
  const { user: dataUser, loading, error } = useSelector(selectProfile);
  useEffect(() => {
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    async function fetchDataUser() {
      try {
        if (id) getUserById(id);
        console.log(dataUser);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDataUser();
  }, [dataUser, id]);

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  useEffect(() => {
    const fetchUserPosts = async () => {
      if (!id) return;
      try {
        const posts = await getPostsByIdUser(id);
        setUserPosts(posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchUserPosts();
  }, [id]);
  const token = localStorage.getItem("token");

  const handleFollow = async (id: string, token: string) => {
    if (!token) return <p>A User is unauthorized</p>;
    await dispatch(followUser({ userId: id, token: token }));
    await dispatch(getUserById(id));
  };

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
  if (!id) return <p className={styles.error}>User ID not found</p>;
  if (!dataUser) return null;
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isFollowing = dataUser?.followers?.includes(currentUser._id);

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
            {isFollowing ? (
              <button className={styles.unfollowBtn}>Unfollow</button>
            ) : (
              <button
                className={styles.followBtn}
                onClick={() => handleFollow(id, token as string)}
              >
                Follow
              </button>
            )}
            <button className={styles.messageBtn}>Message</button>
          </div>
          <div className={styles.infoAboutUser}>
            <p>
              <span className={styles.count}>{userPosts.length}</span> posts
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
      <UserPagePublications userId={id} onOpenUserModal={onOpenUserModal} />
      {isUserModalOpened && (
        <UserPostModal
          onClose={() => setIsUserModalOpened(false)}
          postId={postId}
          dataUser={dataUser}
        />
      )}
    </section>
  );
};
export default UserPage;
