import useAuth from "../../../shared/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const PublicOnlyRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/myprofile" replace /> : <Outlet />;
};
export default PublicOnlyRoute;
