import styles from "./MyProfilePublications.module.css";
import NoPostInProfile from "../../../shared/components/NoPostInProfile/NoPostInProfile";
import { MultiImageIcon } from "../../../shared/components/icons/index";
import type { IPostData } from "../../../shared/api/posts/postsRoutes";

import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { selectPosts } from "../../../redux/posts/post.selector";
import { useSelector } from "react-redux";
import Loader from "../../../shared/components/Loader/Loader";
import { getPostById } from "../../../redux/posts/post.thunk";
import { useEffect } from "react";
interface Props {
  postsData: IPostData[];
  setModal: (state: boolean) => void;
  loading: boolean;
  error: string | null;
}

const MyProfilePublications = ({
  postsData,
  setModal,
  loading,
  error,
}: Props) => {
  const dispatch = useAppDispatch();

  const { postById } = useSelector(selectPosts);
  useEffect(() => {
    console.log(postById);
  }, [dispatch, postById]);
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

  if (postsData.length === 0) {
    return <NoPostInProfile />;
  }
  const onOpenPostModal = (id: string) => {
    dispatch(getPostById(id)).then(() => {
      setModal(true);
    });
  };

  return (
    <article className={styles.publications}>
      {postsData.map((post) => {
        const hasMultiple = post.imageUrls.length > 1;
        const imageUrl = post.imageUrls[0];

        return (
          <div
            key={post._id}
            className={styles.postContainer}
            onClick={() => onOpenPostModal(post._id)}
          >
            <img
              src={imageUrl}
              alt="Post preview"
              className={styles.postImage}
            />
            {hasMultiple && (
              <div className={styles.multiIcon}>
                <MultiImageIcon size={20} color="#fff" />
              </div>
            )}
          </div>
        );
      })}
    </article>
  );
};

export default MyProfilePublications;
