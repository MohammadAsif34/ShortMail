import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/component/loading/Loader";
import { fetchUser } from "../redux/userSlice";
import { logout } from "../redux/authSlice";
import { fetchMails } from "../redux/mailSlice";

const PrivateRoutes = ({ children }) => {
  const auth = useSelector((s) => s.auth);
  const user = useSelector((s) => s.user);
  const mail = useSelector((s) => s.mail);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetch = async () => {
      if (!auth?.token) return dispatch(logout());
      const res = await dispatch(fetchUser());
      if (fetchUser.rejected.match(res)) {
        // dispatch(logout({ dispatch, clearUser: true, clearMail: true }));
        dispatch(logout());
        return;
      }
      const res2 = await dispatch(fetchMails());
      if (fetchMails.rejected.match(res2)) {
        // dispatch(logout({ dispatch, clearUser: true, clearMail: true }));
        dispatch(logout());
        return;
      }
    };
    fetch();
  }, [dispatch, auth]);

  // console.log("H-auth data:", auth);
  // console.log("H-User data:", user);
  console.log("H-mail data:", mail);  

  if (user.loading) return <Loader />;
  if (!auth.isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
