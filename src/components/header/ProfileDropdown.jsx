import { Camera, HelpCircle, LogOut, Settings, User } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
// import Settings from "../setting/Settings";

const ProfileDropdown = ({ setOpen }) => {
  const [showLogout, setShowLogout] = useState(false);
  const dispatch = useDispatch();
  return (
    <>
      <div className="min-w-[300px] absolute right-0 mt-2 w-52 bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden z-50">
        <div className="p-2 border-b border-gray-300 text-center">
          <p className="text-sm py-2 text-gray-500">asif@imail.in</p>
          <div className="w-fit p-1 mx-auto  bg-gray-200 rounded-full cursor-default relative">
            <img
              src="https://i.pravatar.cc/40?img=9"
              alt="user"
              className="w-30 h-30 rounded-full "
            />
            <Camera
              size={40}
              className=" absolute bottom-2 right-1 p-2 bg-gray-200  shadow rounded-full cursor-pointer hover:bg-blue-200 hover:text-blue-600"
            />
          </div>
          <h4 className="font-semibold py-2 text-gray-800">Mohammad Asif</h4>
        </div>

        <div className="mx-6 my-4  rounded-3xl overflow-hidden flex flex-col gap-1">
          <DropdownItem icon={<User />} label="Profile" />
          <DropdownItem icon={<Settings />} label="Settings" />
          <DropdownItem icon={<HelpCircle />} label="Help & Support" />
          <DropdownItem
            icon={<LogOut />}
            label="Logout"
            danger
            onClick={() => {
              dispatch(logout());
              setOpen(false);
            }}
          />
        </div>

        <div className="border-t border-gray-300"></div>
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
      className={`w-full  bg-gray-100  hover:text-blue-600 flex items-center space-x-3 px-6 py-3 text-sm transition rounded-md ${
        danger
          ? "text-red-500 hover:bg-red-50"
          : "text-gray-700 hover:bg-blue-100"
      }`}
    >
      <span className="w-4 h-4 scale-90 -translate-y-0.5 mr-4">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
