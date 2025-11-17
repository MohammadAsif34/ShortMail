import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/component/loading/Loader";
import { fetchUser } from "../redux/userSlice";
import { logout } from "../redux/authSlice";
import apiClient from "../api/apiClient";
import { fetchMails } from "../redux/emailSlice";

const PrivateRoutes = ({ children }) => {
  const auth = useSelector((s) => s.auth);
  const user = useSelector((s) => s.user);
  const mail = useSelector((s) => s.email);
  const dispatch = useDispatch();

  useEffect(() => {
    const FetchDetails = async () => {
      // fetch authenticated user details
      const userRes = await dispatch(fetchUser());
      if (fetchUser.rejected.match(userRes)) return dispatch(logout());

      // fetch all email of authenticated user
      const emailRes = await dispatch(fetchMails());
      if (fetchMails.rejected.match(emailRes))
        console.log("fetch emails failed");
      // const emailsRes = await dispatch();
    };
    FetchDetails();
  }, []);

  // console.log("H-auth data:", auth);
  // console.log("H-User data:", user);
  console.log("H-mail data:", mail);

  if (user.loading) return <Loader />;
  if (!auth.isAuth) return <Navigate to="/login" replace />;

  return (
    <>
      <div className="relative">
        <div className="w-screen h-screen absolute top-0 left-0 bg-[url('./bg-shortmail.jpg')] bg-cover bg-center -z-10 "></div>
        {children}
      </div>
    </>
  );
};

export default PrivateRoutes;
