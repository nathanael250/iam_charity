import { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

const ProtectedAdminRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

  useEffect(() => {
    setIsAuthenticated(authService.isAuthenticated());

    const handleExpiredSession = () => {
      setIsAuthenticated(false);
      navigate("/admin/login", { replace: true, state: { from: location.pathname } });
    };
    window.addEventListener("admin-session-expired", handleExpiredSession);
    return () => window.removeEventListener("admin-session-expired", handleExpiredSession);
  }, [location.pathname, navigate]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedAdminRoute;
