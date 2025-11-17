import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

// import MailL from "../../../data/dummyMail.json";
import MailHeader from "./MailHeader";
import MailFooter from "./MailFooter";
import MailSenderInfo from "./MailSenderInfo";
import MailContent from "./MailContent";
import { useDispatch, useSelector } from "react-redux";
import MailError from "../../component/MailError";
import apiClient from "../../../api/apiClient";
import { readMails } from "../../../redux/emailSlice";

const Mail = () => {
  const dispatch = useDispatch();
  let id = useLocation().pathname.split("/");
  id = atob(id[id.length - 1]);

  const emails = useSelector((s) => s.email.all);
  const email = emails.filter((m) => m._id === id)[0];
  useEffect(() => {
    const readMail = async () => {
      const res = await dispatch(readMails(id));
    };
    if (!email?.read) {
      readMail();
    }
  }, []);

  // user;

  if (!id) return <MailError />;

  return (
    <>
      <div
        id="mail-content"
        className="w-full h-full bg-white/50 flex flex-col bg-w hite shadow-sm  overflow-hidden "
      >
        {/* ===== Header ===== */}
        <MailHeader mail={email} />
        {/* ===== Mail Body ===== */}
        <div className="px-6 flex-1 flex flex-col overflow-y-auto custom-scroll ">
          {/* ===== Sender Info ===== */}
          <MailSenderInfo mail={email} />
          {/* ===== Mail Content ===== */}
          <MailContent mail={email} />
          {/* ===== Footer Actions ===== */}
          <MailFooter mail={email} />
        </div>
      </div>
    </>
  );
};

export default Mail;
