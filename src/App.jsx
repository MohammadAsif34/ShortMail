import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
// import MailList from "./components/dashboard/MailList";
import Setting from "./components/section/setting/Setting";
import ComposeMail from "./components/component/ComposeMail";
// import MailMessage from "./components/section/mail/MailMessage";
import ErrorPage from "./components/component/ErrorPage";
import MailList from "./components/section/mail-list/MailList";
import Mail from "./components/section/mail/Mail";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import SplashScreen from "./components/component/SplashScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoutes>
        <MainLayout />
      </PrivateRoutes>
    ),
    children: [
      { path: "", element: <Navigate to={"/inbox"} replace /> },
      { path: "inbox", element: <MailList /> },
      { path: "inbox/:id", element: <Mail /> },
      { path: "sent", element: <MailList /> },
      { path: "starred", element: <MailList /> },
      { path: "archived", element: <MailList /> },
      { path: "trash", element: <MailList /> },
      { path: "draft", element: <MailList /> },
      { path: "settings", element: <Setting /> },
      { path: "compose", element: <ComposeMail /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },

  // ======== Auth Routes ===========
  {
    path: "/login",
    element: (
      <PublicRoutes>
        <LoginPage />
      </PublicRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoutes>
        <RegisterPage />
      </PublicRoutes>
    ),
  },

  // ======== Invalid Routes ==========
  { path: "*", element: <ErrorPage /> },
]);
const App = () => {
  const [start, setStart] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setStart(false);
    }, 1000);
    // console.log("App loaded");
    return () => clearTimeout(timer);
  }, []);
  if (start) return <SplashScreen />;
  return <RouterProvider router={router} />;
};

export default App;
