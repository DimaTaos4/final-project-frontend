import styles from "./UserPagePublications.module.css";
import { getPostsByIdUser } from "../../../shared/api/posts/postsRoutes";
import { useEffect, useState } from "react";
import ichgramLogo from "../../../assets/ichgramLogo.png";
import { MultiImageIcon } from "../../../shared/components/icons";
import Loader from "../../../shared/components/Loader/Loader";
import { AxiosError } from "axios";
export interface Post {
  _id: string;
  imageUrls: string[];
  caption: string;
  createdAt: string;
  updatedAt: string;
  author: string;
}

interface UserIdPost {
  userId: string;
  onOpenUserModal: (id: string) => void;
}

const UserPagePublications = ({ userId, onOpenUserModal }: UserIdPost) => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);
  useEffect(() => {
    async function fetchDataUser() {
      try {
        const userData = await getPostsByIdUser(userId);
        setUserPosts(userData);
      } catch (error) {
        console.error(error);
        if (error instanceof AxiosError) setError(error);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchDataUser();
    }
  }, [userId]);
  if (error) {
    return (
      <div className={styles.errorWrapper}>
        <p className={styles.errorText}>{error.message}</p>
      </div>
    );
  }
  return (
    <section className={styles.userPublications}>
      {loading ? (
        <div className={styles.loadingPosts}>
          <Loader loading={loading} />
        </div>
      ) : userPosts.length === 0 ? (
        <div className={styles.noPost}>
          <img src={ichgramLogo} alt="Ichgram logo" className={styles.logo} />
          <h2 className={styles.title}>No Posts Yet</h2>
        </div>
      ) : (
        userPosts.map((post) => {
          const hasMultiple = post.imageUrls.length > 1;
          const imageUrl = post.imageUrls[0];

          return (
            <div
              key={post._id}
              className={styles.imageContainer}
              onClick={() => onOpenUserModal(post._id)}
            >
              <img src={imageUrl} alt="post" className={styles.image} />
              {hasMultiple && (
                <div className={styles.multiIcon}>
                  <MultiImageIcon size={20} color="#fff" />
                </div>
              )}
            </div>
          );
        })
      )}
    </section>
  );
};

export default UserPagePublications;
