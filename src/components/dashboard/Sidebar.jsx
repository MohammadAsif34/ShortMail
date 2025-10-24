import {
  Archive,
  Inbox,
  LogOut,
  Mail,
  MailCheck,
  Menu,
  Notebook,
  Plus,
  Send,
  Settings,
  Star,
  Trash2,
  X,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileDropdown from "../header/ProfileDropdown";

const Sidebar = () => {
  const [state, setState] = useState("Inbox");
  const [open, setOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <>
      {/* Top Navbar for Mobile */}
      <div className="md:hidden min-w-[500px]  fixed top-0 left-0 right-0 z-40  shadow-md flex justify-between items-center  px-2 border py-3 border-b border-gray-200">
        <button
          onClick={() => setProfileDropdown(true)}
          className="text-gray-700 hover:text-blue-600 transition"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="w-full flex items-center justify-between space-x-2">
          <div className="flex ml-12 items-center gap-2">
            <MailCheck className="text-blue-600 w-6 h-6" />
            <h1 className="text-lg font-semibold text-blue-600 font-mono">
              z-mail.com
            </h1>
          </div>
          <div className=" relative ">
            <button
              className="flex items-center focus:outline-2 outline-blue-500 rounded-full"
              onClick={() => setProfileDropdown((p) => !p)}
            >
              <img
                src="https://i.pravatar.cc/40?img=3"
                alt="user"
                className="w-10 h-10 rounded-full"
              />
            </button>
            {profileDropdown && (
              <ProfileDropdown setOpen={setProfileDropdown} />
            )}
          </div>
        </div>
        <div className="w-6 h-6"></div>
      </div>

      {/* Sidebar for desktop & mobile */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white shadow-md border-r border-gray-300 flex flex-col justify-between transform transition-transform duration-300 z-50 
        ${open ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:w-64`}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bord er-b border-gray-200">
            {/* <div> */}
            <Link to={"/"} className="flex items-center space-x-2">
              <Mail className="text-blue-600 w-6 h-6" />
              <h1 className="text-xl font-semibold text-blue-600 font-serif">
                z-mail.com
              </h1>
            </Link>
            {/* </div> */}
            <button
              onClick={() => setOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
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
              icon={<Trash2 />}
              label="Trash"
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
