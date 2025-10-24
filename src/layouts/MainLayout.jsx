import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import MailList from "../components/dashboard/MailList";
import MailMessage from "../components/dashboard/MailMessage";

const MainLayout = () => {
  return (
    <>
      <main className="flex h-screen bg-gray-50 text-gray-800">
        {/* Sidebar */}

        <Sidebar />

        {/* Main Section */}
        <section className="flex-1 flex flex-col">
          {/* Top Bar */}
          <Header />

          {/* Email List */}
          {/* <article className="flex-1 gr id grid-cols-3 border-t="> */}
          {/* Mail List */}
          <article className="h-[calc(91.5vh)] overflow-y-auto custom-scroll relative">
            <Outlet />
            {/* </div> */}
          </article>
        </section>
      </main>
    </>
  );
};

export default MainLayout;
