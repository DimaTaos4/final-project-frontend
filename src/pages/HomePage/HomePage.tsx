import { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import { LikeIcon, MultiImageIcon } from "../../shared/components/icons";
import CommentIcon from "../../shared/components/icons/CommentIcon";
import checkedViewIcon from "../../assets/checkedView.png";
import ichgramLogo from "../../assets/ichgramLogo.png";
import {
  getPostFromFollowing,
  likePostApi,
} from "../../shared/api/posts/postsRoutes";
import useAuth from "../../shared/hooks/useAuth";
import { getRelativeTime } from "../../shared/utils/dateUtils";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { followUser, unfollowUser } from "../../redux/users/users.thunk";
import { getUserById } from "../../redux/profile/profile.thunk";

import Loader from "../../shared/components/Loader/Loader";
import UserPostModal from "../UserPage/UserPostModal/UserPostModal";
import type { DataUserProps } from "../UserPage/UserPostModal/UserPostModal";
import type { AxiosError } from "axios";

interface Post {
  _id: string;
  author: {
    _id: string;
    userName: string;
    avatarUrl: string;
    followers: string[];
  };
  likes: string[];
  comments: string[];
  imageUrls: string[];
  caption: string;
  updatedAt: string;
  createdAt: string;
}

const HomePage = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const [isUserModalOpened, setIsUserModalOpened] = useState(false);
  const [postId, setPostId] = useState("");
  const [dataUser, setDataUser] = useState<DataUserProps | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        if (!user) return;
        const data = await getPostFromFollowing(user.id);
        setPosts(data);
      } catch (err) {
        if (err instanceof Error) setError(err as AxiosError);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = async (postId: string) => {
    if (!token || !user?.id) return;

    try {
      const updatedPost = await likePostApi(postId, token);

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id
            ? {
                ...updatedPost,
                author: post.author,
                updatedAt: post.updatedAt,
                createdAt: post.createdAt,
              }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking post", err);
    }
  };

  const handleFollow = async (id: string) => {
    if (!token) return;
    await dispatch(followUser({ userId: id, token }));
    await dispatch(getUserById(id));
  };

  const handleUnfollow = async (id: string) => {
    if (!token) return;
    await dispatch(unfollowUser({ userId: id, token }));
    await dispatch(getUserById(id));
  };

  const handleOpenUserModal = (postId: string, dataUser: DataUserProps) => {
    setIsUserModalOpened(true);
    setPostId(postId);
    setDataUser(dataUser);
  };

  if (loading) {
    return (
      <div className={styles.loaderWrapper}>
        <Loader loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorText}>{error.message}</p>
      </div>
    );
  }
  if (!user?.id) {
    return <p>Unauthorized</p>;
  }

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
                <article key={post._id} className={styles.blockPost}>
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
                      {getRelativeTime(
                        post.updatedAt !== post.createdAt
                          ? post.updatedAt
                          : post.createdAt
                      )}
                    </span>

                    {user &&
                      post.author._id !== user.id &&
                      (post.author.followers?.includes(user.id) ? (
                        <button
                          className={styles.btnFollowing}
                          onClick={() => handleUnfollow(post.author._id)}
                        >
                          Following
                        </button>
                      ) : (
                        <button
                          className={styles.btnFollow}
                          onClick={() => handleFollow(post.author._id)}
                        >
                          Follow
                        </button>
                      ))}
                  </div>

                  {post.imageUrls.length > 0 && (
                    <div className={styles.postImageWrapper}>
                      <img
                        src={post.imageUrls[0]}
                        alt="post"
                        className={styles.image}
                        onClick={() =>
                          handleOpenUserModal(post._id, post.author)
                        }
                      />
                      {post.imageUrls.length > 1 && (
                        <div className={styles.multiIcon}>
                          <MultiImageIcon size={20} color="#fff" />
                        </div>
                      )}
                    </div>
                  )}

                  <div className={styles.likeCommentBlock}>
                    <button
                      className={styles.likeIcon}
                      onClick={() => handleLike(post._id)}
                    >
                      <LikeIcon
                        size={21}
                        className={styles.likeIcon}
                        color={
                          post.likes?.includes(user?.id) ? "#FF0014" : undefined
                        }
                        filled={post.likes?.includes(user?.id)}
                      />
                    </button>

                    <CommentIcon size={21} color="#fff" />
                  </div>

                  <p className={styles.amountLikes}>
                    {post.likes.length} likes
                  </p>

                  <div className={styles.captionBlock}>
                    <span className={styles.username}>
                      {post.author.userName}
                    </span>
                    <span className={styles.caption}>
                      {isExpanded || !isLong
                        ? post.caption
                        : post.caption.slice(0, 50) + "..."}
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

                  <p className={styles.infoComments}>
                    View all comments ({post.comments.length})
                  </p>
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
