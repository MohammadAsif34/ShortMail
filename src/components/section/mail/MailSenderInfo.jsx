import { User } from "lucide-react";
import React from "react";

const MailSenderInfo = ({ mail }) => {
  return (
    <>
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
    </>
  );
};

export default MailSenderInfo;
