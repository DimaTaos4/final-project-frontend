import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { LikeIcon } from "../../shared/components/icons";
import CommentIcon from "../../shared/components/icons/CommentIcon";
import checkedViewIcon from "../../assets/checkedView.png";
import { getPostFromFollowing } from "../../shared/api/posts/postsRoutes";
import useAuth from "../../shared/hooks/useAuth";
import { getRelativeTime } from "../../shared/utils/dateUtils";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { getUserById } from "../../redux/profile/profile.thunk";
import { followUser, unfollowUser } from "../../redux/users/users.thunk";
import ichgramLogo from "../../assets/ichgramLogo.png";
import { AxiosError } from "axios";
import Loader from "../../shared/components/Loader/Loader";
import { MultiImageIcon } from "../../shared/components/icons/index";
import UserPostModal from "../UserPage/UserPostModal/UserPostModal";
import type { DataUserProps } from "../UserPage/UserPostModal/UserPostModal";

interface Post {
  _id: string;
  author: {
    _id: string;
    userName: string;
    avatarUrl: string;
    followers: string[];
  };
  imageUrls: string[];
  caption: string;
  updatedAt: string;
  createdAt: string;
}

const HomePage = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState("");
  const [dataUser, setDataUser] = useState<DataUserProps | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isUserModalOpened, setIsUserModalOpened] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        if (!user) return null;
        const data = await getPostFromFollowing(user.id);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        if (error instanceof AxiosError) setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const dispatch = useAppDispatch();
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
  if (loading)
    return (
      <div className={styles.loaderWrapper}>
        <Loader loading={true} />
      </div>
    );
  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorText}>{error.message}</p>
      </div>
    );
  }

  const handleOpenUserModal = (postId: string, dataUser: DataUserProps) => {
    setIsUserModalOpened(true);
    setPostId(postId);
    setDataUser(dataUser);
  };

  return (
    <>
      {posts.length === 0 ? (
        <div className={styles.noFeedWrapper}>
          <div className={styles.noFeedBlock}>
            <img
              src={ichgramLogo}
              alt="Explore illustration"
              className={styles.noFeedImage}
            />
            <h2 className={styles.noFeedTitle}>No posts yet</h2>
            <p className={styles.noFeedText}>
              Follow people to see photos and videos they share.
            </p>
            <a href="/explore" className={styles.noFeedButton}>
              Explore people
            </a>
          </div>
        </div>
      ) : (
        <div>
          <main className={styles.homePage}>
            {posts.map((post, index) => {
              const isLong = post.caption.length > 50;
              const isExpanded = expandedIndex === index;

              return (
                <article
                  key={post._id}
                  className={styles.blockPost}
                  onClick={() => handleOpenUserModal(post._id, post.author)}
                >
                  <div className={styles.aboutWhom}>
                    <img
                      src={post.author.avatarUrl}
                      alt="avatar"
                      className={styles.avatar}
                    />
                    <Link to={`/user/${post.author._id}`}>
                      <span className={styles.username}>
                        {post.author.userName}
                      </span>
                    </Link>
                    <span className={styles.postDate}>
                      {post?.updatedAt && post?.createdAt
                        ? getRelativeTime(
                            post.updatedAt !== post.createdAt
                              ? post.updatedAt
                              : post.createdAt
                          )
                        : "unknown"}
                    </span>
                    {user && post.author.followers.includes(user.id) ? (
                      <button
                        className={styles.btnFollowing}
                        onClick={() =>
                          handleUnfollow(post.author._id, token as string)
                        }
                      >
                        following
                      </button>
                    ) : (
                      <button
                        className={styles.btnFollow}
                        onClick={() =>
                          handleFollow(post.author._id, token as string)
                        }
                      >
                        follow
                      </button>
                    )}
                  </div>
                  {post.imageUrls.length > 0 && (
                    <div className={styles.postImageWrapper}>
                      <img
                        src={post.imageUrls[0]}
                        alt="post"
                        className={styles.image}
                      />
                      {post.imageUrls.length > 1 && (
                        <div className={styles.multiIcon}>
                          <MultiImageIcon size={20} color="#fff" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.likeCommentBlock}>
                    <LikeIcon size={21} />
                    <CommentIcon size={21} color="#fff" />
                  </div>

                  <p className={styles.amountLikes}>101 824 likes</p>

                  <div className={styles.captionBlock}>
                    <span className={styles.username}>
                      {post.author.userName}
                    </span>
                    <span className={styles.caption}>
                      <span className={styles.captionText}>
                        {isExpanded || !isLong
                          ? post.caption
                          : post.caption.slice(0, 50) + "..."}
                      </span>
                      {isLong && (
                        <button
                          className={styles.moreButton}
                          onClick={() =>
                            setExpandedIndex(isExpanded ? null : index)
                          }
                        >
                          {isExpanded ? "less" : "more"}
                        </button>
                      )}
                    </span>
                  </div>

                  <p className={styles.infoComments}>View all comments (732)</p>
                </article>
              );
            })}
          </main>
          {isUserModalOpened && dataUser && (
            <UserPostModal
              onClose={() => setIsUserModalOpened(false)}
              postId={postId}
              dataUser={dataUser}
            />
          )}
          <div className={styles.infoText}>
            <img
              src={checkedViewIcon}
              alt="checked icon"
              className={styles.checked}
            />
            <p className={styles.firstMessage}>You've seen all the updates</p>
            <p className={styles.secondMessage}>
              You have viewed all new publications
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
