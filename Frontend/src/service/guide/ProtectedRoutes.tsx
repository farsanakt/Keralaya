import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector((state: any) => state.guide.isAuthenticated);

  
  return isAuthenticated ? <>{children}</> : <Navigate to="/guide/login" />;
};

export default ProtectedRoute;
