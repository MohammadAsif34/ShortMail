import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const auth = useSelector((s) => s.auth);

  if (auth.isAuth) return <Navigate to="/" replace />;
  return children;
};

export default PublicRoutes;
