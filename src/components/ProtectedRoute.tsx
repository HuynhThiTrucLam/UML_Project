import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute = ({
  redirectPath = "/admin/login",
}: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  useEffect(() => {
    console.log("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);
  // Allow access to the login page regardless of authentication status
  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  // If not authenticated, redirect to login page with the return URL
  if (isAuthenticated !== null && !isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
