import styles from "./UserPage.module.css";
import type { Post } from "./UserPagePublications/UserPagePublications";
import UserPagePublications from "./UserPagePublications/UserPagePublications";
import { getPostsByIdUser } from "../../shared/api/posts/postsRoutes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserById } from "../../redux/profile/profile.thunk";
import { useSelector } from "react-redux";
import { selectProfile } from "../../redux/profile/profile.selector";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import Loader from "../../shared/components/Loader/Loader";
import { AvatarIchgram } from "../../shared/components/icons/index";
import UserPostModal from "./UserPostModal/UserPostModal";
import { followUser, unfollowUser } from "../../redux/users/users.thunk";
import { getChatApi } from "../../shared/api/chats/chatsRoutes";
import FollowerModal from "../../shared/components/Modals/FollowersModal/FollowersModal";
import FollowingModal from "../../shared/components/Modals/FollowingModal/FollowingModal";
import { useNavigate } from "react-router-dom";
import {
  getFollowersById,
  getFollowingById,
} from "../../shared/api/users/usersRoutes";

const UserPage = () => {
  const [isUserModalOpened, setIsUserModalOpened] = useState(false);
  const [isFollowerModal, setIsFollowerModal] = useState(false);
  const [isFollowingModal, setIsFollowingModal] = useState(false);

  const [dataFollowModal, setDataFollowModal] = useState([]);
  const [dataFollowingModal, setDataFollowingModal] = useState([]);

  const [postId, setPostId] = useState("");
  const onOpenUserModal = (postId: string) => {
    setIsUserModalOpened(true);
    setPostId(postId);
  };
  const { id } = useParams();

  const fetchDataFollowers = async (id: string) => {
    try {
      const data = await getFollowersById(id);
      setDataFollowModal(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataFollowing = async (id: string) => {
    try {
      const data = await getFollowingById(id);
      setDataFollowingModal(data);
    } catch (error) {
      console.error(error);
    }
  };

  function onOpenFollowModal(id: string) {
    setIsFollowerModal(true);

    fetchDataFollowers(id);
  }

  function onOpenFollowingModal(id: string) {
    setIsFollowingModal(true);
    fetchDataFollowing(id);
  }

  const dispatch = useAppDispatch();

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
    if (!token)
      return <p className={styles.errorText}>A User is unauthorized</p>;
    await dispatch(followUser({ userId: id, token: token }));
    await dispatch(getUserById(id));
  };

  const handleUnfollow = async (id: string, token: string) => {
    if (!token)
      return <p className={styles.errorText}>A User is unauthorized</p>;
    await dispatch(unfollowUser({ userId: id, token: token }));
    await dispatch(getUserById(id));
  };

  const navigate = useNavigate();

  const handleToMessage = async (recipientId: string, token: string) => {
    try {
      const { chatId } = await getChatApi(recipientId, token);
      navigate(`/messages/${chatId}`);
    } catch (error) {
      console.error(error);
    }
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
            <>
              <div className={styles.ava1}>
                <AvatarIchgram
                  size={150}
                  color="white"
                  className="avatarImage"
                />
              </div>
              <div className={styles.ava2}>
                <AvatarIchgram
                  size={84}
                  color="white"
                  className="avatarImage"
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.infoActionBlock}>
          <div className={styles.actionPart}>
            <span className={styles.username}>{dataUser?.userName}</span>
            {isFollowing ? (
              <button
                className={styles.unfollowBtn}
                onClick={() => handleUnfollow(id, token as string)}
              >
                Following
              </button>
            ) : (
              <button
                className={styles.followBtn}
                onClick={() => handleFollow(id, token as string)}
              >
                Follow
              </button>
            )}
            <button
              className={styles.messageBtn}
              onClick={() => handleToMessage(dataUser._id, token as string)}
            >
              Message
            </button>
            {isFollowerModal && (
              <FollowerModal
                dataFollowers={dataFollowModal}
                dataUser={dataUser}
                onClose={() => setIsFollowerModal(false)}
                handleUnfollow={handleUnfollow}
                handleFollow={handleFollow}
              />
            )}
            {isFollowingModal && (
              <FollowingModal
                onClose={() => setIsFollowingModal(false)}
                dataFollowing={dataFollowingModal}
                dataUser={dataUser}
                handleUnfollow={handleUnfollow}
                handleFollow={handleFollow}
              />
            )}
          </div>
          <div className={styles.infoAboutUser}>
            <p>
              <span className={styles.count}>{userPosts.length}</span> posts
            </p>
            <p onClick={() => onOpenFollowModal(id)}>
              <span className={styles.count}>{dataUser?.followers.length}</span>
              followers
            </p>
            <p onClick={() => onOpenFollowingModal(id)}>
              <span className={styles.count}>{dataUser?.following.length}</span>
              following
            </p>
          </div>
          <p className={styles.textAboutUser}>{dataUser?.bio}</p>
          <a href={`${dataUser.link}`} className={styles.link} target="_blank">
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
