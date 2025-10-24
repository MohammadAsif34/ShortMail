import { Search } from "lucide-react";
import React, { useState } from "react";
import ProfileDropdown from "../header/ProfileDropdown";

const Header = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="hidden min-md:flex px-4 py-2 bg-white border-b border-gray-300  items-center justify-between">
        <div className="flex items-center space-x-3 w-full max-w-md bg-gray-100 rounded-full px-3 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search mail..."
            className=" h-6 bg-transparent outline-none w-full text-sm text-gray-500"
          />
        </div>
        <div className=" mr-4  relative ">
          <button
            className="flex items-center focus:outline-2 outline-blue-500 rounded-full"
            onClick={() => setOpen((p) => !p)}
          >
            <img
              src="https://i.pravatar.cc/40?img=3"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          </button>
          {open && <ProfileDropdown setOpen={setOpen} />}
        </div>
      </header>
    </>
  );
};

export default Header;
