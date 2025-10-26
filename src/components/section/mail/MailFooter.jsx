import { Forward, Printer, Reply } from "lucide-react";
import React from "react";

const MailFooter = () => {
  return (
    <>
      <footer className="flex items-center  justify-between px-6 py-8  ">
        <div className="flex space-x-3">
          <button className="flex items-center px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
            <Reply className="w-4 h-4 mr-2" />
            Reply
          </button>
          <button className="flex items-center px-3 py-2 rounded-full border text-gray-600 border-gray-400 hover:bg-gray-200 transition">
            <Forward className="w-4 h-4 mr-2" />
            Forward
          </button>
        </div>

        <button className="flex items-center px-3 py-2 rounded-full border text-gray-600 border-gray-400 hover:bg-gray-200 transition">
          <Printer className="w-4 h-4 mr-2" />
          Print
        </button>
      </footer>
    </>
  );
};

export default MailFooter;
