import styles from "./EditProfilePage.module.css";
import Button from "../../shared/components/Button/Button";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../../shared/hooks/useAppDispatch";
import { logout } from "../../redux/users/users.slice";
import type { IValues } from "../../shared/api/users/usersRoutes";
import {
  editUserApi,
  getUserApiById,
} from "../../shared/api/users/usersRoutes";
import { useNavigate } from "react-router-dom";
import { AvatarIchgram } from "../../shared/components/icons";

const MAX_BIO_LENGTH = 150;

const EditProfilePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<IValues>();

  const bioValue = watch("bio", "");

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [avatarUser, setAvatarUser] = useState<{ avatarUrl: string } | null>(
    null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAvatar = async () => {
      if (!user?.id) return;
      try {
        const data = await getUserApiById(user.id);
        setAvatarUser(data);
      } catch (err) {
        console.error("Ошибка загрузки аватара:", err);
      }
    };

    fetchUserAvatar();
  }, [user?.id]);

  const onSubmit = async (values: IValues): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const formData = new FormData();
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }

      if (values.userName) formData.append("userName", values.userName);
      if (values.link) formData.append("link", values.link);
      if (values.bio) formData.append("bio", values.bio);
      if (values.removeAvatar) formData.append("removeAvatar", "true");

      const data = await editUserApi(token as string, formData);

      if (user) {
        const updated = { ...user, avatarUrl: data.avatarUrl };
        localStorage.setItem("user", JSON.stringify(updated));
      }

      navigate("/myprofile");
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unexpected error"));
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreviewAvatar(previewUrl);
      setSelectedFile(file);
    }
  };
  const handleRemoveAvatar = () => {
    setValue("removeAvatar", true);
    setPreviewAvatar(null);
    setSelectedFile(null);
    setAvatarUser(null);
  };

  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <section className={styles.editProfile}>
      <h2>Edit profile</h2>

      <div className={styles.infoProfile}>
        {previewAvatar ? (
          <img
            className={styles.avatar}
            src={previewAvatar}
            alt="preview avatar"
          />
        ) : avatarUser?.avatarUrl ? (
          <img
            className={styles.avatar}
            src={avatarUser.avatarUrl}
            alt="avatar"
          />
        ) : (
          <AvatarIchgram size={56} color="white" className="avatarImage" />
        )}

        <div className={styles.infoText}>
          <h3>ichschool</h3>
          <p>• Гарантия помощи с трудоустройством в ведущие IT-компании</p>
        </div>

        <div className={styles.avatarButtons}>
          <label htmlFor="avatarUpload" className={styles.avatarButton}>
            New photo
          </label>
          <button
            type="button"
            className={styles.removeAvatar}
            onClick={handleRemoveAvatar}
          >
            Delete photo
          </button>
          <input
            id="avatarUpload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <input
            id="removeAvatar"
            type="checkbox"
            style={{ display: "none" }}
            {...register("removeAvatar")}
          />
        </div>
      </div>

      {loading && <p className={styles.loading}>Saving changes...</p>}
      {error && <p className={styles.error}>{error.message}</p>}

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.label}>
          Username
          <input type="text" placeholder="Username" {...register("userName")} />
          {errors.userName && (
            <span className={styles.error}>{errors.userName.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Website
          <input type="text" placeholder="Website" {...register("link")} />
        </label>

        <label className={styles.label}>
          About
          <div className={styles.textareaWrapper}>
            <textarea
              placeholder="Something about yourself..."
              className={styles.textarea}
              rows={4}
              maxLength={MAX_BIO_LENGTH}
              {...register("bio")}
            />
            <span className={styles.charCount}>
              {bioValue?.length || 0} / {MAX_BIO_LENGTH}
            </span>
          </div>
        </label>

        <Button
          type="submit"
          disabled={loading}
          className={styles.saveEditButton}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={handleLogout}
          type="button"
          disabled={loading}
          className={styles.logoutButton}
        >
          Log Out
        </Button>
      </form>
    </section>
  );
};

export default EditProfilePage;
