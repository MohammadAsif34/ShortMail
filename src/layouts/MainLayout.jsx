import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/section/header/Header";
import Sidebar from "../components/section/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <ToastContainer
        autoClose={1000}
        hideProgressBar={true}
        closeButton={false}
      />
      <main className="flex h-screen   text-gray-800 bg-gray-100">
        {/* ============= Sidebar ============ */}
        <Sidebar />
        {/* ========= Main Section ============= */}
        <section className=" max-md:mt-16  flex-1 flex flex-col p -2 md:p-4">
          {/* ========== Top Bar ============== */}
          <Header />
          <article className="h-[89vh] md:h-[calc(91.5vh)] bg-white  min-md:rounded-2xl  overflow-y-auto custom-scroll relative">
            {/* ========= Home Routes ==========  */}
            <Outlet />
          </article>
        </section>
      </main>
    </>
  );
};

export default MainLayout;
