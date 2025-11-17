import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const auth = useSelector((s) => s.auth);

  if (auth.isAuth) return <Navigate to="/" replace />;
  return (
    <>
      <div className="relative">
        <div className="w-screen h-screen absolute top-0 left-0 bg-[url('./bg-shortmail.jpg')] bg-cover bg-center -z-10 "></div>
        {children}
      </div>
    </>
  );
};

export default PublicRoutes;
