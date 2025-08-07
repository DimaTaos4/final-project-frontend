import styles from "./ExplorePage.module.css";
import { MultiImageIcon } from "../../shared/components/icons";
import { useEffect, useState } from "react";
import { getAllPostsApi } from "../../shared/api/posts/postsRoutes";
import type { IPostData } from "../../shared/api/posts/postsRoutes";
import ichgramLogo from "../../assets/ichgramLogo.png";

const ExplorePage = () => {
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    async function fetchPostsData() {
      try {
        const data = await getAllPostsApi();
        setPostsData(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPostsData();
  }, [postsData]);

  return postsData.length > 0 ? (
    <section className={styles.explore}>
      {postsData.map((post: IPostData) => {
        const hasMultiple = post.imageUrls.length > 1;
        const imageUrl = post.imageUrls[0];

        return (
          <div key={post._id} className={styles.postContainer}>
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
    </section>
  ) : (
    <div className={styles.infoNoContent}>
      <img src={ichgramLogo} alt="ichgram-logo" />
      <p>It's a bit empty here...</p>
      <p>Check back later for more content!</p>
    </div>
  );
};

export default ExplorePage;
