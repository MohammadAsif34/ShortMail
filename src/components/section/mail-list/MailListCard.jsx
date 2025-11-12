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
import { ReadMail, StarredMail, TrashMail } from "../../../api/actions";
import { useNavigate } from "react-router-dom";

const MailListCard = ({ mail }) => {
  const date = new Date(mail.createdAt);
  const day = date.getDate();
  const mon = date.toLocaleString("default", { month: "short" });

  const navigate = useNavigate();

  // mail moved/remove to/from trash
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const res = await TrashMail({ id: id });
    if (res.status == "success") alert(res.message);
    else console.error("delete error");
  };

  // starred/unstarred mail
  const handleStarred = async (e, id) => {
    e.stopPropagation();
    const res = await StarredMail({ id: id });
    if (res.status == "success") alert(res.message);
    else console.error("delete error");
  };
  // read/unread mail
  const handleRead = async (e, id) => {
    e.stopPropagation();
    const res = await ReadMail({ id: id });
    if (res.status == "success") alert(res.message);
    else console.error("delete error");
  };

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
            <h3 className="font-semibold  text-gray-800">{mail.from}</h3>
            {/* <p className="text-gray-500 text-xs truncate">{mail.text}</p> */}
          </div>
          <p className="text-gray-700 text-sm">{mail.subject}</p>
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
