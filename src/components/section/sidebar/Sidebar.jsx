import {
  Archive,
  Inbox,
  ListCollapse,
  Notebook,
  Plus,
  Send,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileHeader from "./MobileHeader";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const type = location.pathname.split("/");
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [mobOpen, setMobopen] = useState(false);
  const dropdownRef = useRef();

  const user = useSelector((s) => s.user.data);

  useEffect(() => {
    setState(type[1]);
  }, []);
  useEffect(() => {
    setMobopen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Top Navbar for Mobile */}
      <MobileHeader setMobopen={setMobopen} user={user} />

      {/* Sidebar for desktop & mobile */}
      <aside
        className={` bg-white/75 backdrop-blur-2xl md:bg-transparent fixed top-0 left-0 h-full  flex flex-col justify-between transform transition-transform duration-300 z-50 
        ${open ? "translate-x-0" : "-translate-x-full"} 
         md:translate-x-0 md:static md:w-64 ${mobOpen && "translate-x-0"} `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div
            ref={dropdownRef}
            className="flex items-center justify-between px-6 py-4 bord er-b border-gray-200"
          >
            <div className="flex gap-4">
              <button
                onClick={() => setMobopen(false)}
                className="p-1 rounded-md hover:bg-gray-200 "
              >
                <ListCollapse className="text-blue-500 w-6 h-6 " />
              </button>
              <Link
                to={"/"}
                className="flex items-center space-x-2 select-none"
              >
                <img src="/logo.png" alt="" className="w-10" />
                <h1 className="text-xl font-semibold text-blue-500 font-seri f">
                  ShortMail
                </h1>
              </Link>
            </div>
          </div>

          {/* Compose Button */}
          <Link
            to="Compose"
            onClick={() => setOpen(false)}
            className="m-4 flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Compose</span>
          </Link>

          {/* Navigation */}
          <nav className="mt-2 space-y-1">
            <SidebarItem
              icon={<Inbox />}
              label="Inbox"
              state={state}
              onChange={setState}
              closeSidebar={() => setOpen(false)}
            />
            <SidebarItem
              icon={<Send />}
              label="Sent"
              state={state}
              onChange={setState}
              closeSidebar={() => setOpen(false)}
            />
            <SidebarItem
              icon={<Star />}
              label="Starred"
              state={state}
              onChange={setState}
              closeSidebar={() => setOpen(false)}
            />
            <SidebarItem
              icon={<Archive />}
              label="Archived"
              state={state}
              onChange={setState}
              closeSidebar={() => setOpen(false)}
            />
            <SidebarItem
              icon={<Notebook />}
              label="Draft"
              state={state}
              onChange={setState}
              closeSidebar={() => setOpen(false)}
            />
            <SidebarItem
              icon={<Trash2 />}
              label="Trash"
              state={state}
              onChange={setState}
              closeSidebar={() => setOpen(false)}
            />
          </nav>

          {/* Footer */}
          <div className="mt-auto border-t border-gray-300 p-4">
            <SidebarItem
              icon={<Settings />}
              label="Settings"
              state={state}
              onChange={setState}
              closeSidebar={() => setOpen(false)}
            />
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm md:hidden z-40"
        ></div>
      )}
    </>
  );
};

export default Sidebar;

// Sidebar Item Component
function SidebarItem({ icon, label, state, onChange, closeSidebar }) {
  return (
    <Link
      to={label}
      onClick={() => {
        onChange(label);
        closeSidebar();
      }}
      className={`flex items-center space-x-3 px-6 py-3 text-sm font-medium transition-all ease-linear duration-150 ${
        state === label
          ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <span className="w-5 h-5">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}
