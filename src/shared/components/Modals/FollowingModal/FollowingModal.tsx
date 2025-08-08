import styles from "./FollowingModal.module.css";
import { AvatarIchgram } from "../../icons/index";
import { useEffect, useRef } from "react";
import type { IUserDoc } from "../../../../redux/users/users.slice";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
interface DataProps {
  _id: string;
  userName: string;
  avatarUrl: string;
}

interface DataFollowingProps {
  dataFollowing: DataProps[];
  onClose: () => void;
  dataUser: IUserDoc;
  handleFollow: (id: string, token: string) => void;
  handleUnfollow: (id: string, token: string) => void;
}

const FollowingModal = ({
  dataFollowing,
  onClose,
  dataUser,
  handleFollow,
  handleUnfollow,
}: DataFollowingProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const token = localStorage.getItem("token");
  const { currentUser } = useAuth();
  console.log(currentUser);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!currentUser) return null;
  return (
    <section className={styles.overlay}>
      <div className={styles.followerModal} ref={modalRef}>
        <p className={styles.myUsername}>{dataUser.userName}</p>

        <div className={styles.amountFollowers}>
          <p>{dataFollowing.length} Following</p>
        </div>
        {dataFollowing ? (
          <div className={styles.listFollowers}>
            {dataFollowing.map((data) => (
              <div className={styles.followInfo} key={data._id}>
                <div className={styles.infoFollowBlock}>
                  {data.avatarUrl ? (
                    <img
                      src={data.avatarUrl}
                      alt="avatar"
                      className={styles.avatarImage}
                    />
                  ) : (
                    <AvatarIchgram
                      size={32}
                      color="white"
                      className="avatarImage"
                    />
                  )}
                  <Link
                    to={
                      data._id === currentUser._id
                        ? "/myprofile"
                        : `/user/${data._id}`
                    }
                    onClick={() => onClose()}
                  >
                    <span className={styles.username}>{data.userName}</span>
                  </Link>
                </div>

                {data._id !== currentUser._id &&
                  (currentUser.following.includes(data._id) ? (
                    <button
                      className={styles.btnFollowing}
                      onClick={() => handleUnfollow(data._id, token as string)}
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      className={styles.btnFunc}
                      onClick={() => handleFollow(data._id, token as string)}
                    >
                      Follow
                    </button>
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.notFollowingText}>
            Not following anyone yet
          </div>
        )}
      </div>
    </section>
  );
};

export default FollowingModal;
