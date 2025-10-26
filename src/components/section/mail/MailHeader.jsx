import { ArrowLeft, MoreVertical, PrinterIcon, ReplyIcon, Star, Trash2 } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const MailHeader = ({ mail }) => {
  const navigate = useNavigate();
  return (
    <>
      <header className="invisible md:visible flex items-center justify-between px-6 py-1 border-b border-gray-200 shadow-sm bg-gray-50 sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-200 transition"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h2 className="text- font-semibold text-gray-800">
            {mail?.subject}
          </h2>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-200">
            <PrinterIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <ReplyIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
            <Star className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-200">
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
