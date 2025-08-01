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
import useAuth from "../../shared/hooks/useAuth";
import { selectPosts } from "../../redux/posts/post.selector";
import { getAllPosts, deletePost } from "../../redux/posts/post.thunk";
import { clearPostById } from "../../redux/posts/post.slice";

const MyProfilePage = () => {
  const { user, token } = useAuth();
  const dispatch = useAppDispatch();
  const [modal, setModal] = useState(false);

  const {
    user: dataUser,
    loading: loadingUser,
    error: errorUser,
  } = useSelector(selectUsers);

  const { posts, loading, error, postById } = useSelector(selectPosts);

  // 🔁 Загрузка информации о пользователе
  useEffect(() => {
    if (user?.id) {
      dispatch(getUserById(user.id));
    }
  }, [dispatch, user?.id]);

  // 🔁 Загрузка всех постов
  useEffect(() => {
    if (token) {
      dispatch(getAllPosts(token));
    }
  }, [dispatch, token]);

  // ❌ Удаление поста с безопасной обработкой и toast
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
