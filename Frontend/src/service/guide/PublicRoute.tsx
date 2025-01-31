import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface PublicRouteProps {
  children: React.ReactNode; 
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const currentGuide = useSelector((state: any) => state.guide.currentGuide);

  console.log("Public Route: currentGuide =", currentGuide);

  
  if (currentGuide) {
    return <Navigate to="/guide/dashboard" replace />;
  }

  
  return <>{children}</>;
};

export default PublicRoute;
