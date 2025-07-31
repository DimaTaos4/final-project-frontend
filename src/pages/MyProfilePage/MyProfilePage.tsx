import styles from "./MyProfilePage.module.css";
import { AvatarIchgram } from "../../shared/components/icons";
import MyProfilePublications from "./MyProfilePublications/MyProfilePublications";
import Loader from "../../shared/components/Loader/Loader";
import PostModal from "../../shared/components/Modals/PostModal/PostModal";
import type { IPostData } from "../../shared/api/posts/postsRoutes";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/users.selector";
import { getUserById } from "../../redux/users/users.thunk";
import useAuth from "../../shared/hooks/useAuth";
import { selectPosts } from "../../redux/posts/post.selector";
import { getAllPosts, deletePost } from "../../redux/posts/post.thunk";

const MyProfilePage = () => {
  const { user, token } = useAuth();
  const dispatch = useAppDispatch();

  const {
    user: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useSelector(selectUsers);

  const [modal, setModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [post, setPost] = useState<IPostData | null>(null);

  // Fetch user from Redux
  useEffect(() => {
    if (user?.id) {
      dispatch(getUserById(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!selectedPostId || !token) return;

      try {
        const { getPostById } = await import(
          "../../shared/api/posts/postsRoutes"
        );
        const data = await getPostById(token, selectedPostId);
        setPost(data);
        setModal(true);
      } catch (err) {
        console.error("Ошибка загрузки поста:", err);
      }
    };

    fetchPost();
  }, [selectedPostId, token]);

  // Handle deleting a post
  const handlePostDeleted = (deleteId: string) => {
    setModal(false);
    setSelectedPostId(null);
    setPost(null);

    if (token) {
      dispatch(deletePost({ id: deleteId, token })).then(() => {
        dispatch(getAllPosts(token));
      });

      toast.success("Post successfully deleted");
    }
  };

  const { posts, loading, error } = useSelector(selectPosts);
  // Fetch all posts
  useEffect(() => {
    if (token) {
      dispatch(getAllPosts(token));
    }
  }, [dispatch, token]);

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
                <AvatarIchgram
                  size={150}
                  color="white"
                  className="avatarImage"
                />
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
                  <span>{posts.length}</span> posts
                </p>
                <p>
                  <span>9993</span> followers
                </p>
                <p>
                  <span>59</span> following
                </p>
              </div>

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
              onOpen={(id) => setSelectedPostId(id)}
            />
          </div>
        </>
      )}

      {modal && post && (
        <PostModal
          onClose={() => {
            setModal(false);
            setSelectedPostId(null);
          }}
          post={post}
          loading={loading}
          error={error}
          onPostDeleted={handlePostDeleted}
        />
      )}
    </section>
  );
};

export default MyProfilePage;
