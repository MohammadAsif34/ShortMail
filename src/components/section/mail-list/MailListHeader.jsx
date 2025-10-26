import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  RotateCw,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// import { fetchMails } from "../../../redux/mailSlice";
import Loader from "../../component/loading/Loader2";
// import { fetchMails } from "../../../redux/mailSlice";

const MailListHeader = ({ type, start, end, totalPage, page, setPage }) => {
  const mail = useSelector((s) => s.mail);
  const dispatch = useDispatch();

  // const refreshMail = async () => {
  //   const res = await dispatch(fetchMails());
  //   if (fetchMails.rejected.match(res)) {
  //     // dispatch(logout());
  //     // return;
  //   }
  // };
  // let mail;

  return (
    <>
      {mail?.loading && (
        <div className="fixed top-1 left-1/2 px-4 py-1 border rounded-md flex items-center bg-blue-200 text-blue-500">
          Loading <Loader className="w-[80px] h-0.5" />
        </div>
      )}
      <div className="flex items-center justify-between px-6 py-2 bg-white shadow-sm sticky top-0 z-10">
        <div className="flex gap-8 items-center">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            // onClick={() => refreshMail()}
          >
            <RotateCw size={16} />
          </button>
          {/* ========== mail type header ============  */}
          <h2 className="w-40  text-lg font-semibold tracking-widest text-gray-500">
            {type}
          </h2>

          {/* ======== Action Operation ============  */}
        </div>
        {/* ============ Action Filter ==============  */}
        <div className="flex items-center  gap-4 text-gray-600">
          <p className="hidden md:block text-xs font-semibold text-gray-400 mr-2 tracking-widest">
            {start} - {end} of {totalPage}
          </p>
          <button
            className=" hidden md:block p-2 -ml-4 rounded-full hover:bg-gray-100"
            onClick={() => setPage(page - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className=" hidden md:block p-2 rounded-full hover:bg-gray-100"
            onClick={() => setPage(page + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default MailListHeader;
