import React from "react";

const MailContent = ({ mail }) => {
  return (
    <>
      <p className="px-6 py-4 flex-1 leading-relaxed text-gray-700">
        {mail?.text}

        {/* <span className="font-semibold text-gray-800">Team I-Mail</span> */}
      </p>
    </>
  );
};

export default MailContent;
