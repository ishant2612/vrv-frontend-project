import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminDashboard from "../dashboard/AdminDashboard";
import ManagerDashboard from "../dashboard/ManagerDashboard";
import UserDashboard from "../dashboard/UserDashboard";

const RoleBasedRoute = () => {
  const { userRoles } = useAuth();

  if (userRoles.includes("admin")) {
    return <AdminDashboard />;
  }

  if (userRoles.includes("manager")) {
    return <ManagerDashboard />;
  }

  if (userRoles.includes("user")) {
    return <UserDashboard />;
  }

  return <Navigate to="/login" />;
};

export default RoleBasedRoute;
