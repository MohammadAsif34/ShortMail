import { Paperclip } from "lucide-react";
import React from "react";

export const ComposeMailAttachment = () => {
  return (
    <>
      {/* Attachments */}
      <div className="flex items-center space-x-3 mt-2">
        <label className="flex items-center space-x-2 cursor-pointer text-blue-600 hover:text-blue-800 hover:cursor-not-allowed">
          <Paperclip className="w-5 h-5" />
          <span className="text-sm">Attach File</span>
          <input type="file" className="hidden" />
        </label>
      </div>
    </>
  );
};
