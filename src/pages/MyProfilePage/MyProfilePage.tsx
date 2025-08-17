import styles from "./MyProfilePage.module.css";
import { AvatarIchgram } from "../../shared/components/icons";
import MyProfilePublications from "./MyProfilePublications/MyProfilePublications";
import Loader from "../../shared/components/Loader/Loader";
import PostModal from "../../shared/components/Modals/PostModal/PostModal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/users.selector";
import { getUserById } from "../../redux/users/users.thunk";
import { getUserById as getUserByIdFromProfile } from "../../redux/profile/profile.thunk";
import useAuth from "../../shared/hooks/useAuth";
import { selectPosts } from "../../redux/posts/post.selector";
import { getAllPosts, deletePost } from "../../redux/posts/post.thunk";
import { clearPostById } from "../../redux/posts/post.slice";
import { followUser, unfollowUser } from "../../redux/users/users.thunk";
import FollowerModal from "../../shared/components/Modals/FollowersModal/FollowersModal";
import FollowingModal from "../../shared/components/Modals/FollowingModal/FollowingModal";
import {
  getFollowersById,
  getFollowingById,
} from "../../shared/api/users/usersRoutes";

const MyProfilePage = () => {
  const { user, token } = useAuth();
  const dataUserFromLocalStorage = JSON.parse(
    localStorage.getItem("user") as string
  );
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);
  const [isFollowerModal, setIsFollowerModal] = useState(false);
  const [isFollowingModal, setIsFollowingModal] = useState(false);

  const [dataFollowers, setDataFollowers] = useState([]);
  const [dataFollowing, setDataFollowing] = useState([]);

  const fetchDataFollowers = async (id: string) => {
    try {
      const data = await getFollowersById(id);
      setDataFollowers(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataFollowing = async (id: string) => {
    try {
      const data = await getFollowingById(id);
      setDataFollowing(data);
    } catch (error) {
      console.error(error);
    }
  };

  function handleOpenFollowerModal(id: string) {
    setIsFollowerModal(true);
    fetchDataFollowers(id);
  }
  function handleOpenFollowingModal(id: string) {
    setIsFollowingModal(true);
    fetchDataFollowing(id);
  }
  const {
    user: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useSelector(selectUsers);

  const { posts, loading, error, postById } = useSelector(selectPosts);

  useEffect(() => {
    if (user?.id) {
      dispatch(getUserById(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (token) {
      dispatch(getAllPosts(token));
    }
  }, [dispatch, token]);

  const handlePostDeleted = async (deleteId: string) => {
    setModal(false);
    if (!token) return;

    try {
      await dispatch(deletePost({ id: deleteId, token })).unwrap();
      await dispatch(getAllPosts(token));
      toast.success("Post successfully deleted");
    } catch {
      toast.error("Failed to delete post");
    }
  };

  const handleFollow = async (id: string, token: string) => {
    if (!token) return <p>A User is unauthorized</p>;
    await dispatch(followUser({ userId: id, token: token }));
    await dispatch(getUserByIdFromProfile(id));
  };

  const handleUnfollow = async (id: string, token: string) => {
    if (!token) return <p>A User is unauthorized</p>;
    await dispatch(unfollowUser({ userId: id, token: token }));
    await dispatch(getUserByIdFromProfile(id));
  };
  return (
    <section className={styles.myProfilePage}>
      {loadingUser && <Loader loading={loadingUser} />}
      {errorUser && <p>{errorUser}</p>}

      {dataUser && (
        <>
          <div className={styles.myProfileBlock}>
            <div className={styles.myProfileAvatar}>
              {dataUser.avatarUrl ? (
                <img src={dataUser.avatarUrl} alt="avatar" />
              ) : (
                <>
                  <div className={styles.avaIch}>
                    <AvatarIchgram
                      size={150}
                      color="white"
                      className="avatarImage"
                    />
                  </div>
                  <div className={styles.avaMedia}>
                    <AvatarIchgram
                      size={100}
                      color="white"
                      className="avatarImage"
                    />
                  </div>
                  <div className={styles.avaMedia2}>
                    <AvatarIchgram
                      size={64}
                      color="white"
                      className="avatarImage"
                    />
                  </div>
                </>
              )}
            </div>

            <div className={styles.myProfileBlockInfo}>
              <div className={styles.myProfileNameEdit}>
                <div className={styles.username}>{dataUser.userName}</div>
                <a href="/edit" className={styles.btnEdit}>
                  Edit profile
                </a>
              </div>

              <div className={styles.audience}>
                <p>
                  <span>{posts?.length ?? 0}</span> posts
                </p>
                <p onClick={() => handleOpenFollowerModal(user?.id as string)}>
                  <span>{dataUser?.followers?.length ?? 0}</span> followers
                </p>
                <p onClick={() => handleOpenFollowingModal(user?.id as string)}>
                  <span>{dataUser?.following?.length ?? 0}</span> following
                </p>
              </div>
              {isFollowerModal && (
                <FollowerModal
                  dataFollowers={dataFollowers}
                  dataUser={dataUserFromLocalStorage}
                  onClose={() => setIsFollowerModal(false)}
                  handleFollow={handleFollow}
                  handleUnfollow={handleUnfollow}
                />
              )}
              {isFollowingModal && (
                <FollowingModal
                  dataUser={dataUserFromLocalStorage}
                  dataFollowing={dataFollowing}
                  onClose={() => setIsFollowingModal(false)}
                  handleFollow={handleFollow}
                  handleUnfollow={handleUnfollow}
                />
              )}

              <div className={styles.myProfileAbout}>{dataUser.bio}</div>

              {dataUser.link && (
                <a
                  className={styles.link}
                  href={dataUser.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {dataUser.link}
                </a>
              )}
            </div>
          </div>

          <div className={styles.publications}>
            <MyProfilePublications
              postsData={posts}
              loading={loading}
              error={error}
              setModal={setModal}
            />
          </div>
        </>
      )}

      {modal && postById && (
        <PostModal
          onClose={() => {
            setModal(false);
            dispatch(clearPostById());
          }}
          post={postById}
          loading={loading}
          error={error}
          onPostDeleted={handlePostDeleted}
        />
      )}
    </section>
  );
};

export default MyProfilePage;
