import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

// import MailL from "../../../data/dummyMail.json";
import MailHeader from "./MailHeader";
import MailFooter from "./MailFooter";
import MailSenderInfo from "./MailSenderInfo";
import MailContent from "./MailContent";
import { useSelector } from "react-redux";
import MailError from "../../component/MailError";
import apiClient from "../../../api/apiClient";

const Mail = () => {
  let id = useLocation().pathname.split("/");
  id = atob(id[id.length - 1]);

  const mails = useSelector((s) => s.email.all);
  const mail = mails.filter((m) => m._id === id)[0];
  useEffect(() => {
    const readMail = async () => {
      const res = await apiClient.put("/email/read", { id: mail._id });
      console.log("mail read: ", res);
      if (res.status == "success") alert(res.message);
    };
    if (!mail.read) {
      readMail();
    }
  }, []);

  // user;

  if (!id) return <MailError />;

  return (
    <>
      <div
        id="mail-content"
        className="w-full h-full flex flex-col bg-w hite shadow-sm  overflow-hidden "
      >
        {/* ===== Header ===== */}
        <MailHeader mail={mail} />
        {/* ===== Mail Body ===== */}
        <div className="px-6 flex-1 flex flex-col overflow-y-auto custom-scroll ">
          {/* ===== Sender Info ===== */}
          <MailSenderInfo mail={mail} />
          {/* ===== Mail Content ===== */}
          <MailContent mail={mail} />
          {/* ===== Footer Actions ===== */}
          <MailFooter mail={mail} />
        </div>
      </div>
    </>
  );
};

export default Mail;
