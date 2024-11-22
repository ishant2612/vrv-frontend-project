import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRoles } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role));
  if (!hasAllowedRole) {
    if (userRoles.includes("admin")) {
      return <Navigate to="/admin" />;
    } else if (userRoles.includes("manager")) {
      return <Navigate to="/manager" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

  return children;
};

export default ProtectedRoute;
