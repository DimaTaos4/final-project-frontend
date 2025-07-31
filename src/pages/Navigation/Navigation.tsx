import styles from "./Navigation.module.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import ResetPage from "../ResetPage/ResetPage";
import HomePage from "../HomePage/HomePage";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute/PublicOnlyRoute";
import MyProfilePage from "../MyProfilePage/MyProfilePage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";
import EditProfilePage from "../EditProfilePage/EditProfilePage";
import CreateModal from "../../shared/components/Modals/CreateModal/CreateModal";
type NavigationProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

const Navigation = ({ isModalOpen, toggleModal }: NavigationProps) => {
  return (
    <div className={styles.navigation}>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/edit" element={<EditProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      {isModalOpen && <CreateModal onClose={toggleModal} />}
    </div>
  );
};

export default Navigation;
