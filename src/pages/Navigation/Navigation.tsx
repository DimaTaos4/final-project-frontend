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
import CookiesPolicyPage from "../CookiesPolicyPage/CookiesPolicyPage";
import TermsPage from "../TermsPage/TermsPage";
import PrivacyPage from "../PrivacyPage/PrivacyPage";
import VerifyEmailPage from "../VerifyEmailPage/VerifyEmailPage";
import ResetPasswordPage from "../ResetPasswordPage/ResetPasswordPage";
import SearchModal from "../../moduls/layouts/Sidebar/SearchModal/SearchModal";
import NotificationsModal from "../../moduls/layouts/Sidebar/NotificationsModal/NotificationsModal";
import UserPage from "../UserPage/UserPage";
import ExplorePage from "../ExplorePage/ExplorePage";
import MessagePage from "../MessagePage/MessagePage";
import MessageWindow from "../MessagePage/MessageWindow/MessageWindow";
import EmptyChat from "../MessagePage/EmptyChat/EmptyChat";
import LearnMorePage from "../LearnMorePage/LearnMorePage";
type NavigationProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
  isSearchOpen: boolean;
  toggleSearch: () => void;
  isNotificationOpen: boolean;
  toggleNotification: () => void;
};

const Navigation = ({
  isModalOpen,
  toggleModal,
  isSearchOpen,
  toggleSearch,
  isNotificationOpen,
  toggleNotification,
}: NavigationProps) => {
  return (
    <div className={styles.navigation}>
      <Routes>
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset" element={<ResetPage />} />
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/edit" element={<EditProfilePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/messages" element={<MessagePage />}>
            <Route index element={<EmptyChat />} />
            <Route path=":chatId" element={<MessageWindow />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/legal/cookies" element={<CookiesPolicyPage />} />
        <Route path="/legal/terms" element={<TermsPage />} />
        <Route path="/legal/privacy" element={<PrivacyPage />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
      </Routes>

      {isModalOpen && <CreateModal onClose={toggleModal} />}
      {isSearchOpen && <SearchModal onClose={toggleSearch} />}
      {isNotificationOpen && (
        <NotificationsModal onClose={toggleNotification} />
      )}
    </div>
  );
};

export default Navigation;
