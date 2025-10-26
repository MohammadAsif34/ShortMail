import { Search } from "lucide-react";
import React, { useState } from "react";
import ProfileDropdown from "../../header/ProfileDropdown";
import { useSelector } from "react-redux";

const Header = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((s) => s.user.data);

  return (
    <>
      <header className="hidden min-md:flex p py-2   items-center justify-between">
        <div className="flex items-center space-x-3 w-full max-w-md bg-white rounded-full px-3 py-2">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search mail..."
            className=" h-6 bg-transparent outline-none w-full text-sm text-gray-500"
          />
        </div>
        <div className=" mr-4  relative ">
          <button
            className="flex items-center focus:outline-2 outline-blue-500 rounded-full border-2 border-blue-500"
            onClick={() => setOpen((p) => !p)}
          >
            <img
              src={user?.picture || "https://i.pravatar.cc/1000?img=12"}
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
