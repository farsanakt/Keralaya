import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

type ProtectedRouteProps = {

  element: JSX.Element

}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {

  const isAuthenticated = useSelector((state: any) => state.guide.isAuthenticated);

  console.log(isAuthenticated,'jjj  ')
 
  return isAuthenticated ? element : <Navigate to="/guide/login" />;
};

export default ProtectedRoute;