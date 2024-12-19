import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type ProtectedRouteProps = {
  element: JSX.Element;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {

  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  console.log(isAuthenticated,'jjj  ')

  // Redirect to /signup if not authenticated
  return isAuthenticated ? element : <Navigate to="/signup" />;
};

export default ProtectedRoute;

