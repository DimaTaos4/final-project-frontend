import { useState } from "react";
import styles from "./HomePage.module.css";
import avater from "../../assets/troubleImage.png";
import image from "../../assets/post.png";
import { LikeIcon } from "../../shared/components/icons";
import CommentIcon from "../../shared/components/icons/CommentIcon";
import checkedViewIcon from "../../assets/checkedView.png";

const HomePage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const captions = [
    "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
    "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
    "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅𝒆𝒏, 𝘗𝘰𝘯𝘺𝘣𝘰𝘺!",
    "𝘐𝘵’𝘴 𝒈𝒐𝒍𝒅samus earum consequuntur quod atque est laudantium quo quia. Harum facilis reprehenderit expedita error quam. Veniam nemo voluptate pariatur voluptatum eveniet? Reprehenderit error alias neque voluptates totam consectetur repudiandae maxime odit, perspiciatis dolorem.",
  ];

  return (
    <>
      <main className={styles.homePage}>
        {captions.map((caption, index) => {
          const isLong = caption.length > 50;
          const isExpanded = expandedIndex === index;

          return (
            <article key={index} className={styles.blockPost}>
              <div className={styles.aboutWhom}>
                <img src={avater} alt="avatar" className={styles.avatar} />
                <span className={styles.username}>username</span>
                <span className={styles.postDate}>2 week</span>
                <button className={styles.btnFollowing}>following</button>
              </div>

              <img src={image} alt="image" className={styles.image} />
              <div className={styles.likeCommentBlock}>
                <LikeIcon size={21} />
                <CommentIcon size={21} color="#fff" />
              </div>

              <p className={styles.amountLikes}>101 824 likes</p>

              <div className={styles.captionBlock}>
                <span className={styles.username}>username</span>
                <span className={styles.caption}>
                  <span className={styles.captionText}>
                    {isExpanded || !isLong
                      ? caption
                      : caption.slice(0, 50) + "..."}
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
    </>
  );
};

export default HomePage;
