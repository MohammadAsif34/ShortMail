import { HelpCircle, LogOut, Settings, User } from "lucide-react";
import React, { useState } from "react";
// import Settings from "../setting/Settings";

const ProfileDropdown = ({ setOpen }) => {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <>
      <div className="min-w-[300px] absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
        <div className="p-2 border-b border-gray-300">
          <div className="py-1 px-2 flex items-center gap-3 bg-gray-100 rounded-full cursor-default">
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-800">Mohammad Asif</h4>
              <p className="text-sm text-gray-500">asif@imail.in</p>
            </div>
          </div>
        </div>

        <div className="py-1">
          <DropdownItem icon={<User />} label="Profile" />
          <DropdownItem icon={<Settings />} label="Settings" />
          <DropdownItem icon={<HelpCircle />} label="Help & Support" />
        </div>

        <div className="border-t border-gray-300">
          <DropdownItem
            icon={<LogOut />}
            label="Logout"
            danger
            onClick={() => {
              setShowLogout(true);
              setOpen(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default ProfileDropdown;

/* Reusable Dropdown Item */
function DropdownItem({ icon, label, danger = false, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-3 text-sm transition ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <span className="w-4 h-4 scale-90 -translate-y-0.5 mr-4">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
