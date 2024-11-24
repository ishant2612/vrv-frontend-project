// import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { currentUser, userRoles } = useAuth();

//   if (!currentUser) {
//     return <Navigate to="/login" />;
//   }

//   const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role));
//   if (!hasAllowedRole) {
//     if (userRoles.includes("admin")) {
//       return <Navigate to="/admin" />;
//     } else if (userRoles.includes("manager")) {
//       return <Navigate to="/manager" />;
//     } else {
//       return <Navigate to="/user" />;
//     }
//   }

//   return children;
// };

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { currentUser, userRoles } = useAuth();

  // Redirect to login if user is not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  // If userRoles is not set or empty, assume no valid roles and redirect accordingly
  if (!userRoles || userRoles.length === 0) {
    return <Navigate to="/login" />;
  }

  // Check if the current user's roles include any of the allowed roles
  const hasAllowedRole = allowedRoles.some((role) => userRoles.includes(role));
  if (!hasAllowedRole) {
    // Redirect to a different dashboard based on the user's role
    if (userRoles.includes("admin")) {
      return <Navigate to="/admin" />;
    } else if (userRoles.includes("manager")) {
      return <Navigate to="/manager" />;
    } else {
      return <Navigate to="/user" />;
    }
  }

  return children; // Render the protected route's children if role is allowed
};

export default ProtectedRoute;
