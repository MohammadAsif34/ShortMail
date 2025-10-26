import React, { useEffect, useState } from "react";
import NoMailFound from "../../component/NoMailFound";
import Mail from "../../../data/dummyMail.json";
import { Link, useLocation } from "react-router-dom";
import { RefreshCcw, MoreHorizontal, Search, Filter } from "lucide-react";
import MailListCard from "./MailListCard";
import MailListHeader from "./MailListHeader";
import { useSelector } from "react-redux";
import Loader from "../../component/loading/Loader";
import Loading from "../../component/loading/Loading";

const MailList = () => {
  const [mail, setMail] = useState([]);
  let location = useLocation();
  let type = location.pathname.split("/")[1];

  const mails = useSelector((s) => s.mail);

  useEffect(() => {
    if (!mails || mails.all.length === 0) return;

    switch (type.toLowerCase()) {
      case "inbox":
        setMail(mails.inbox);
        break;
      case "sent":
        setMail(mails.sent);
        break;
      case "starred":
        setMail(mails.starred);
        break;
      case "archived":
        setMail(mails.archived);
        break;
      case "trash":
        setMail(mails.trash);
        break;
      case "draft":
        setMail(mails.draft);
        break;
      default:
        setMail([]);
        break;
    }
  }, [type, mails]);

  const BtoA = (id) => btoa(id);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* ===== HEADER ===== */}
        <MailListHeader type={type} />

        {mail?.length === 0 ? (
          <NoMailFound />
        ) : (
          <div className="flex-1 overflow-y-auto custom-scroll p-1 bg-gray-50">
            {/* ===== MAIL LIST ===== */}
            {mail?.map((m, i) => (
              // <Link key={m?._id || i} to={BtoA(m._id)} className="">
              <MailListCard key={m._id || i} mail={m} />
              // </Link>
            ))}
          </div>
        )}
        {/* ===== FOOTER =====
        <div className="px-4 py-2 border-t border-gray-200 bg-white text-sm text-gray-600 flex items-center justify-between">
          <span>Showing {Mail.length} emails</span>
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 hover:underline">Previous</button>
            <button className="text-blue-600 hover:underline">Next</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default MailList;
