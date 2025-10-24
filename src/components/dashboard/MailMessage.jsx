import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import {
  ArrowLeft,
  Reply,
  Forward,
  Printer,
  MoreVertical,
  Star,
  Trash2,
  User,
  PrinterIcon,
  ReplyIcon,
} from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { PrintMail } from "../../utils/PrintMail";

import Mail from "../../data/dummyMail.json";

const MailMessage = () => {
  const [mail, setMail] = useState(null);
  let id = useLocation().pathname.split("/");
  id = atob(id[id.length - 1]);
  const a = Mail.filter((m) => m.id == id);
  // id = Mail.find(id);

  useEffect(() => {
    setMail(a[0]);
  }, []);
  console.log(id);
  if (!id) return;

  console.log(mail);

  return (
    <>
      <div>
        <MailTemplate mail={mail} />
      </div>
    </>
  );
};

export default MailMessage;

const MailTemplate = ({ mail, abc }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        id="mail-content"
        className="w-full h-full flex flex-col bg-w hite shadow-sm  overflow-hidden "
      >
        {/* ===== Header ===== */}
        <header className="flex items-center justify-between px-6 py-2 border-b border-gray-300 bg-gray-50 sticky top-0 z-10">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h2 className="text-lg font-semibold text-gray-800">
              {mail?.subject}
            </h2>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <button
              className="p-2 rounded-full hover:bg-gray-200"
              onClick={abc}
            >
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

        {/* ===== Mail Body ===== */}
        <div className="flex-1 overflow-y-auto px-6 p custom-scro ll">
          {/* ===== Sender Info ===== */}
          <div className=" pt-2 pb-4 flex items-center justify-between ">
            <div className=" py-1 px-2 bg-gray-100 rounded-full flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="pr-4 -translate-y-0.5">
                <h3 className="font-semibold text-gray-800">{mail?.from}</h3>
                <p className="text-xs text-gray-500">
                  To:{" "}
                  <span className="font-medium text-gray-700">
                    {mail?.to == "you@i-mail.in" ? "me" : mail?.to}
                  </span>
                </p>
              </div>
            </div>
            <div className="">
              <span className="text-sm text-gray-500">10:30 AM, Oct 14</span>
            </div>
          </div>

          <p className="px-6 py-4  leading-relaxed text-gray-700">
            {mail?.body}
            {/* Hi there,
            <br />
            <br />
            This is a friendly reminder about tomorrow’s meeting at{" "}
            <strong>10:00 AM</strong>. Please review the attached agenda before
            joining.
            <br />
            <br />
            Best regards,
            <br />
            <span className="font-semibold text-gray-800">Team I-Mail</span> */}
          </p>

          {/* ===== Footer Actions ===== */}
          <footer className="flex items-center justify-between px-6 py-8  ">
            <div className="flex space-x-3">
              <button className="flex items-center px-3 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition">
                <Reply className="w-4 h-4 mr-2" />
                Reply
              </button>
              <button className="flex items-center px-3 py-2 rounded-full border text-gray-700 hover:bg-gray-100 transition">
                <Forward className="w-4 h-4 mr-2" />
                Forward
              </button>
            </div>

            <button className="flex items-center px-3 py-2 rounded-full border text-gray-700 hover:bg-gray-100 transition">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
          </footer>
        </div>
      </div>
    </>
  );
};
