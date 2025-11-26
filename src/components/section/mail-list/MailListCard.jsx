import React from "react";
import {
  Archive,
  Mail,
  MailOpen,
  MoreVertical,
  RotateCcw,
  Star,
  StarOff,
  Trash2,
  User,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useEmailActions } from "../../../hooks/useEmailActions";

const MailListCard = ({ mail, type }) => {
  let date = "25 Nov";
  if (mail?.createdAt) {
    let d = new Date(mail?.createdAt);
    const day = d.getDate();
    const mon = d.toLocaleString("default", { month: "short" });
    date = day + " " + mon;
  }

  const navigate = useNavigate();
  const { handleArchived, handleDelete, handleStarred, handleRead } =
    useEmailActions();

  return (
    <>
      {/* ======== mobile view card ================= */}
      {/* ======== Mobile Mail Card ======== */}
      <div
        onClick={() => navigate(btoa(mail._id))}
        className="
    md:hidden
    w-full
    mt-2
    px-3 py-2
    flex items-center justify-between
    rounded-md
    bg-white/30 backdrop-blur-xl
    shadow-sm
    cursor-pointer
    active:scale-[0.99]
    transition
  "
      >
        {/* Left Section */}
        <div className="flex flex-1 items-center gap-3 overflow-hidden">
          {/* Avatar */}
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={mail?.picture || "/default_avatar.png"}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mail Info */}
          <div className="flex flex-col min-w-0">
            <h3 className="text-sm font-semibold text-gray-800 truncate">
              {mail.from}
            </h3>
            <p className="text-xs text-gray-600 truncate">{mail.subject}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center gap-1 ml-2 text-xs text-gray-500">
          <span className="font-medium whitespace-nowrap">
            {date || "25 Nov"}
          </span>

          <button
            onClick={(e) => handleStarred(e, mail._id)}
            className="text-gray-600 hover:text-yellow-500 active:scale-90 transition"
            aria-label="Star mail"
          >
            {mail.starred ? <StarOff size={18} /> : <Star size={18} />}
          </button>
        </div>
      </div>

      {/* ================ desktop veiw card ==============  */}
      <div
        className={`${
          !mail.read && "bg-blue-100"
        } hidden md:flex justify-between items-center  px-4 py-1 mb-1 border-b rounded-lg border-gray-200  gap-4  hover:bg-blue-50 cursor-pointer transition-all group`}
        onClick={() => navigate(btoa(mail._id))}
      >
        <div className="flex gap-4 items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-4">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          {/* <img
            src="https://i.pravatar.cc/40?img=3"
            alt="user"
            className="w-10 h-10 rounded-full "
          /> */}
          <div className="flex flex-col ">
            <h3 className="font-semibold  text-gray-800">
              {/* {mail.to === email ? mail.to : mail.from}
               */}
              {/* {mail.to} */}
              {type == "sent" ? mail.to : mail.from}
            </h3>
          </div>
          <p className="  sm:w-20 md:w-30 text-gray-700 text-sm truncate">
            {mail.subject}
          </p>
          <p className="max-md:hidden sm:w-20 md:w-30  text-gray-500 text-xs truncate">
            {mail.message}
          </p>
        </div>

        {/* action buttons */}
        {!mail.deleted ? (
          <div className="hidden group-hover:block items-center space-x-3   ">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              title="unread"
              onClick={(e) => handleRead(e, mail._id)}
            >
              {mail.read ? (
                <MailOpen className="w-4 h-4 text-gray-600" />
              ) : (
                <Mail className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              title={`${mail.stared ? "starred" : "unstarred"}`}
              onClick={(e) => handleStarred(e, mail._id)}
            >
              {mail.starred ? (
                <StarOff className="w-4 h-4 text-gray-600" />
              ) : (
                <Star className="w-4 h-4 text-gray-600" />
              )}
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              title="archive"
              onClick={(e) => handleArchived(e, mail._id)}
            >
              <Archive className="w-4 h-4 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              title="trash"
              onClick={(e) => handleDelete(e, mail._id)}
            >
              <Trash2 className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        ) : (
          <div className="flex items-center ">
            <button
              className="p-2 py-1 rounded-full hover:bg-gray-200 flex items-center justify-center gap-2 text-gray-600"
              onClick={(e) => handleDelete(e, mail._id)}
            >
              <span className="-translate-y-0.5">restore </span>
              <RotateCcw className="w-4 h-4 " />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default MailListCard;
