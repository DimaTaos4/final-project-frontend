import { useSelector } from "react-redux";
import { selectUsers } from "../../redux/users/users.selector";
import type { AuthState } from "../../redux/users/users.slice";

function parseJwt(token: string): { userId: string } | null {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((char) => `%${("00" + char.charCodeAt(0).toString(16)).slice(-2)}`)
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to parse JWT:", error);
    return null;
  }
}

const useAuth = () => {
  const { token, loading, error, isAuth }: AuthState = useSelector(selectUsers);

  const decoded = token ? parseJwt(token) : null;
  const user = decoded ? { id: decoded.userId } : null;

  const isAuthenticated = !!token;

  return {
    isAuthenticated,
    token,
    user,
    loading,
    error,
    isAuth,
  };
};

export default useAuth;
