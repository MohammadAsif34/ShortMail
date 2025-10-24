import React from "react";
import NoMailFound from "../component/NoMailFound";
import Mail from "../../data/dummyMail.json";
import { Link } from "react-router-dom";
import { RefreshCcw, MoreHorizontal, Search, Filter } from "lucide-react";

const MailList = () => {
  if (Mail.length === 0) return <NoMailFound />;

  const BtoA = (id) => btoa(id);

  return (
    <>
      <div className="w-full h-full border-r border-gray-300 flex flex-col">
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between px-4 py-1 bg-white shadow-sm sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-800">Inbox</h2>

          <div className="flex items-center space-x-3 text-gray-600">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <RefreshCcw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Filter className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ===== MAIL LIST ===== */}
        <div className="flex-1 overflow-y-auto custom-scroll bg-gray-50">
          {Mail?.map((mail, i) => (
            <Link key={mail?.id} to={BtoA(mail?.id)}>
              <MailCard
                sender={mail?.from}
                subject={mail?.subject || "Meeting Reminder"}
                snippet={mail?.snippet || mail?.body?.slice(0, 80) + "..."}
              />
            </Link>
          ))}
        </div>

        {/* ===== FOOTER ===== */}
        <div className="px-4 py-2 border-t border-gray-200 bg-white text-sm text-gray-600 flex items-center justify-between">
          <span>Showing {Mail.length} emails</span>
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 hover:underline">Previous</button>
            <button className="text-blue-600 hover:underline">Next</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MailList;

function MailCard({ sender, subject, snippet }) {
  return (
    <div className="px-4 py-3 border-b border-gray-200 flex gap-4 items-start hover:bg-blue-50 cursor-pointer transition-all">
      <img
        src="https://i.pravatar.cc/40?img=3"
        alt="user"
        className="w-10 h-10 rounded-full"
      />
      <div className="flex flex-col">
        <h3 className="font-semibold text-sm text-gray-800">{sender}</h3>
        <p className="text-gray-700 text-sm">{subject}</p>
        <p className="text-gray-500 text-xs truncate">{snippet}</p>
      </div>
    </div>
  );
}
