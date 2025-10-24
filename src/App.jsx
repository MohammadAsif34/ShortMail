import React from "react";
import Dashboard from "./Dashboard";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import MailList from "./components/dashboard/MailList";
import Setting from "./components/setting/Setting";
import ComposeMail from "./components/component/ComposeMail";
import MailMessage from "./components/dashboard/MailMessage";
import ErrorPage from "./components/component/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // {
      //   path: "inbox",
      //   element: <MailList />,
      //   children: [{ path: "/:id", element: <MailMessage /> }],
      // },
      { path: "", element: <Navigate to={"/inbox"} replace /> },
      { path: "inbox", element: <MailList /> },
      { path: "inbox/:id", element: <MailMessage /> },
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
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
