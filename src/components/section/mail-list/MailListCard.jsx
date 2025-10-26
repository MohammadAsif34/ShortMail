import { Star } from "lucide-react";
import React from "react";
const MailListCard = ({ mail }) => {
  const date = new Date(mail.createdAt);
  const day = date.getDate();
  const mon = date.toLocaleString("default", { month: "short" });
  return (
    <>
      {/* ======== mobile view card ================= */}
      <div className="max-smw-xs md:hidden mt-1 bg-white  md: py-2 px-2 rounded-sm flex items-center justify-between overflow-hidden">
        <div className="flex flex-1 items-center gap-2 px ">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden ">
            <img
              src={mail?.picture || "https://i.pravatar.cc/150?img=8"}
              alt=""
            />
          </div>
          <div className="w-3/4 ">
            <h3 className="font-semibold text-lg text-gray-800 truncate ">
              {mail.from}
            </h3>
            <p className="text-gray-500 text-sm truncate">{mail.subject}</p>
          </div>
          {/* <p className="text-gray-500 text-xs truncate">{mail.text}</p> */}
        </div>
        <div className=" text-gray-500 ">
          <p className="font-semibold text-sm">{day + " " + mon}</p>
          <Star size={18} className="mx-auto mt-2" />
        </div>
      </div>
      {/* ================ desktop veiw card ==============  */}
      <div className="hidden md:flex px-4 py-3 border-b border-gray-200  gap-4 items-start hover:bg-blue-50 cursor-pointer transition-all">
        <img
        src="https://i.pravatar.cc/40?img=3"
        alt="user"
        className="w-10 h-10 rounded-full "
        />
        <div className="flex flex-col ">
          <h3 className="font-semibold  text-gray-800">{mail.from}</h3>
          <p className="text-gray-700 text-sm">{mail.subject}</p>
          {/* <p className="text-gray-500 text-xs truncate">{mail.text}</p> */}
        </div>
      </div>
    </>
  );
};
export default MailListCard;
