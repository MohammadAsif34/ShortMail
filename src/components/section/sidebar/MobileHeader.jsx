import { ListCollapse, Search } from "lucide-react";
import React, { useState } from "react";
import ProfileDropdown from "../../header/ProfileDropdown";

const MobileHeader = ({ user, setMobopen }) => {
  const [profileDropdown, setProfileDropdown] = useState(false);

  return (
    <>
      <div className="b md:hidden max-w- fixed top-0 left-0 right-0 z-40   flex justify-between items-center  px-2  py-3 ">
        <div className="flex-1 h-10  flex items-center justify-between space-x-2">
          <button
            onClick={() => setMobopen(true)}
            className="p-1 rounded-md hover:bg-gray-200 "
          >
            <ListCollapse className="text-blue-500 w-6 h-6 " />
          </button>
          <div className="flex items-center space-x-3 w-full  bg-white/40 backdrop-blur-2xl rounded-full px-3 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search mail..."
              className=" h-6 bg-transparent outline-none w-full text-sm text-blue-500"
            />
          </div>
          <div className=" relative ">
            <button
              className="w-10 h-10 flex items-center focus:outline-2 outline-blue-500 rounded-full border border-blue-400"
              onClick={() => setProfileDropdown((p) => !p)}
            >
              <img
                src={user?.picture || "https://i.pravatar.cc/1000?img=12"}
                alt="user"
                className=" rounded-full scale-95"
              />
            </button>
            {profileDropdown && (
              <ProfileDropdown setOpen={setProfileDropdown} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
