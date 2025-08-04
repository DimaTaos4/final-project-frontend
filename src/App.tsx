import { useState } from "react";
import Navigation from "./pages/Navigation/Navigation";
import "./shared/styles/styles.css";
import Sidebar from "./moduls/layouts/Sidebar/Sidebar";
import PageLayout from "./moduls/layouts/PageLayout/PageLayout";
import useAuth from "./shared/hooks/useAuth";
import Footer from "./moduls/layouts/Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { isAuthenticated } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const toggleSearch = () => setSearchOpen(!isSearchOpen);
  if (isAuthenticated) {
    return (
      <>
        <PageLayout>
          <Sidebar onOpenModal={toggleModal} onOpenSearch={toggleSearch} />
          <Navigation
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            isSearchOpen={isSearchOpen}
            toggleSearch={toggleSearch}
          />
          <Footer />
        </PageLayout>
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar
        />
      </>
    );
  }

  return (
    <Navigation
      isModalOpen={false}
      toggleModal={() => {}}
      isSearchOpen={false}
      toggleSearch={() => {}}
    />
  );
}

export default App;
