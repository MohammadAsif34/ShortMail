import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MailListHeader from "./MailListHeader";

import { useSelector } from "react-redux";
import MailListCard from "./MailListCard";
import NoMailFound from "../../component/NoMailFound";
import { paginate } from "../../../utils/paginate";

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

  const [page, setPage] = useState(1);
  const { start, end, pageData, totalPage } = paginate(mail, page, 25);

  return (
    <>
      <div className="w-full h-full flex flex-col">
        {/* ===== HEADER ===== */}
        <MailListHeader
          type={type}
          start={start}
          end={end}
          totalPage={totalPage}
          setPage={setPage}
        />

        {mail?.length === 0 ? (
          <NoMailFound />
        ) : (
          <div className="flex-1 overflow-y-auto custom-scroll p-1 bg-gray-50">
            {/* ===== MAIL LIST ===== */}
            {pageData?.map((m, i) => (
              <Link key={m?._id || i} to={BtoA(m._id)} className="">
                <MailListCard key={m._id || i} mail={m} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MailList;
