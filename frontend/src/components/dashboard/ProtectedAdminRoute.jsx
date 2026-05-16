import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";

const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();

  if (!authService.isAuthenticated()) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedAdminRoute;
