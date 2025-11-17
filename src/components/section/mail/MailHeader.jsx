import {
  Archive,
  ArchiveRestore,
  ArrowLeft,
  Mail,
  MailOpen,
  MessageCircleCode,
  MoreVertical,
  PrinterIcon,
  ReplyIcon,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { printMail } from "../../../utils/PrintMail";
import { useDispatch } from "react-redux";
import { trashMails } from "../../../redux/emailSlice";
import { useEmailActions } from "../../../hooks/useEmailActions";
// import { printEmail } from "../../../utils/printMail";

const MailHeader = ({ mail }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { handleStarred, handleArchived, handleDelete, handleRead } =
    useEmailActions();
  console.log(mail);
  return (
    <>
      <header className=" flex items-center justify-between px-6 py-1 border-b border-gray-200 shadow-sm bg-white/40 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text- font-semibold text-gray-800">{mail?.subject}</h2>
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            title="unread"
            onClick={(e) => dispatch(handleRead(e, mail._id))}
          >
            {mail.read ? (
              <MailOpen className="w-5 h-5 text-gray-600" />
            ) : (
              <Mail className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            title="starred"
            onClick={(e) => dispatch(handleStarred(e, mail._id))}
          >
            {mail?.starred ? (
              <StarOff className="w-5 h-5 text-gray-600" />
            ) : (
              <Star className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            title="archive"
            onClick={(e) => handleArchived(e, mail._id)}
          >
            {mail?.archived ? (
              <ArchiveRestore className="w-5 h-5 text-gray-600" />
            ) : (
              <Archive className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            title="print"
            onClick={() => printMail(mail)}
          >
            <PrinterIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div>
          <button
            className="p-2 rounded-full hover:bg-gray-200"
            title="trash"
            onClick={() => dispatch(trashMails(mail._id))}
          >
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>
    </>
  );
};

export default MailHeader;
