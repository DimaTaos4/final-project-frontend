import styles from "./MyProfilePublications.module.css";
import NoPostInProfile from "../../../shared/components/NoPostInProfile/NoPostInProfile";
import { MultiImageIcon } from "../../../shared/components/icons/index";
import type { IPostData } from "../../../shared/api/posts/postsRoutes";

interface Props {
  postsData: IPostData[];
  loading: boolean;
  error: string | null;
  onOpen: (id: string) => void;
}

const MyProfilePublications = ({ postsData, loading, error, onOpen }: Props) => {
  if (loading) {
    return <p className={styles.loadingPosts}>Posts are loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (postsData.length === 0) {
    return <NoPostInProfile />;
  }

  return (
    <article className={styles.publications}>
      {postsData.map((post) => {
        const hasMultiple = post.imageUrls.length > 1;
        const imageUrl = post.imageUrls[0];

        return (
          <div
            key={post._id}
            className={styles.postContainer}
            onClick={() => onOpen(post._id)}
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
