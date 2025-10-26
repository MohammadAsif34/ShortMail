import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Filter,
  LineSquiggle,
  MoreHorizontal,
  MoreVertical,
  RefreshCcw,
  Rotate3D,
  RotateCcw,
  RotateCw,
  Search,
} from "lucide-react";
import React from "react";

const MailListHeader = ({ type }) => {
  return (
    <div className="flex items-center justify-between px-6 py-2 bg-white shadow-sm sticky top-0 z-10">
      <div className="flex gap-8 items-center">
        {/* ========== mail type header ============  */}
        <h2 className="w-40 ml-6 text-lg font-semibold tracking-widest text-gray-500">
          {type}
        </h2>

        {/* ======== Action Operation ============  */}
        <div className="hidden md:block">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <RotateCw size={16} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      {/* ============ Action Filter ==============  */}
      <div className="flex items-center  text-gray-600">
        <p className="text-sm mr-2">0-50 of 25</p>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronRight className="w-4 h-4" />
        </button>
        {/* <button className="p-2 rounded-full hover:bg-gray-100">
          <Filter className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-4 h-4" />
        </button> */}
      </div>
    </div>
  );
};

export default MailListHeader;
