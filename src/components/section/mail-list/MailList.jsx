import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MailListHeader from "./MailListHeader";

import { useSelector } from "react-redux";
import MailListCard from "./MailListCard";
import NoMailFound from "../../component/NoMailFound";
import { paginate } from "../../../utils/paginate";
import { useInboxSocket } from "../../../hooks/useInboxSocket";

const MailList = () => {
  const [email, setEmail] = useState([]);
  let location = useLocation();
  let type = location.pathname.split("/")[1].toLowerCase();

  // const isInbox = type === "inbox";
  // useInboxSocket(isInbox);

  const emails = useSelector((s) => s.email);

  useEffect(() => {
    if (!emails || !emails.all) return;

    switch (type) {
      case "inbox":
        setEmail(emails.inbox);
        break;
      case "sent":
        setEmail(emails.sent);
        break;
      case "starred":
        setEmail(emails.starred);
        break;
      case "archived":
        setEmail(emails.archived);
        break;
      case "trash":
        setEmail(emails.trash);
        break;
      case "draft":
        setEmail(emails.draft);
        break;
      default:
        setEmail([]);
        break;
    }
  }, [type, emails]);

  const BtoA = (id) => btoa(id);

  const [page, setPage] = useState(1);
  const { start, end, pageData, totalPage } = paginate(email, page, 25);

  return (
    <>
      <div className="w-full h-full flex flex-col bg-red- 200/20 ba ckdrop-blur-xl">
        {/* ===== HEADER ===== */}
        <MailListHeader
          type={type}
          start={start}
          end={end}
          totalPage={totalPage}
          setPage={setPage}
        />

        {email?.length === 0 ? (
          <NoMailFound />
        ) : (
          <div className="flex-1 overflow-y-auto custom-scroll p-1">
            {/* <p>{JSON.stringify(email)}</p> */}
            {/* ===== MAIL LIST ===== */}
            {pageData?.map((m) => (
              <MailListCard key={type + "_" + m._id} mail={m} type={type} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MailList;
