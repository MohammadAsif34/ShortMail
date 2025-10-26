import {
  Archive,
  Inbox,
  List,
  ListCollapse,
  LogOut,
  Mail,
  MailCheck,
  Menu,
  Notebook,
  Plus,
  Search,
  Send,
  Settings,
  Star,
  Trash2,
  X,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProfileDropdown from "../../header/ProfileDropdown";

const Sidebar = () => {
  const type = useLocation().pathname.split("/");
  const [state, setState] = useState("");
  const [open, setOpen] = useState(false);
  const [mobOpen, setMobopen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  useEffect(() => {
    setState(type[1]);
  }, []);

  return (
    <>
      {/* Top Navbar for Mobile */}
      <div className="b md:hidden max-w-sm fixed top-0 left-0 right-0 z-40  shadow -md flex justify-between items-center  px-2  py-3 ">
        <div className="flex-1 h-10  flex items-center justify-between space-x-2">
          <button
            onClick={() => setMobopen(true)}
            className="p-1 rounded-md hover:bg-gray-200 "
          >
            <ListCollapse className="text-blue-500 w-6 h-6 " />
          </button>
          <div className="flex items-center space-x-3 w-full  bg-white rounded-full px-3 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search mail..."
              className=" h-6 bg-transparent outline-none w-full text-sm text-gray-500"
            />
          </div>
          {/* <div className="flex ml-12 items-center gap-2">
            <MailCheck className="text-blue-600 w-6 h-6" />
            <h1 className="text-lg font-semibold text-blue-600 font-mono">
              ShortMail
            </h1>
          </div> */}
          <div className=" relative ">
            <button
              className="w-10 h-10 flex items-center focus:outline-2 outline-blue-500 rounded-full"
              onClick={() => setProfileDropdown((p) => !p)}
            >
              <img
                src="https://i.pravatar.cc/40?img=2"
                alt="user"
                className=" rounded-full"
              />
            </button>
            {profileDropdown && (
              <ProfileDropdown setOpen={setProfileDropdown} />
            )}
          </div>
        </div>
        {/* <div className="w-6 h-6"></div> */}
      </div>

      {/* Sidebar for desktop & mobile */}
      <aside
        className={` bg-white md:bg-transparent fixed top-0 left-0 h-full  flex flex-col justify-between transform transition-transform duration-300 z-50 
        ${open ? "translate-x-0" : "-translate-x-full"} 
         md:translate-x-0 md:static md:w-64 ${mobOpen && "translate-x-0"} `}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bord er-b border-gray-200">
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
