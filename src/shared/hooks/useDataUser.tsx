import { useState, useEffect } from "react";
import { getUserApiById } from "../api/users/usersRoutes";
import type { IUserDoc } from "../../redux/users/users.slice";
import { useNavigate } from "react-router-dom";

const useDataUser = (userId: string | undefined) => {
  const [dataUser, setDataUser] = useState<IUserDoc | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [errorUser, setErrorUser] = useState<string | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;

      try {
        setLoadingUser(true);
        const data = await getUserApiById(userId);
        setDataUser(data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setErrorUser("Failed to load user");
      } finally {
        setLoadingUser(false);
      }
    };

    fetchData();
  }, [userId, navigate]);

  return { dataUser, loadingUser, errorUser };
};

export default useDataUser;
