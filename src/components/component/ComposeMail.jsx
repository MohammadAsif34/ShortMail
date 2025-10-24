import React, { useState } from "react";
import { Paperclip, Send, X, Save } from "lucide-react";

export default function ComposeMail({ onClose }) {
  const [to, setTo] = useState("");
  //   const [cc, setCc] = useState("");
  //   const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  return (
    <div className="fixed right-0 inset-0 bg-blac k/40 backdr op-blur -sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[700px] max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Compose Email
        </h2>

        {/* Form */}
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ to, subject, body });
            alert("Email Sent! ✅");
            // onClose();
          }}
        >
          {/* To / CC / BCC */}
          <div className="space-y-2">
            <InputField
              label="To"
              placeholder="recipient@example.com"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            {/* <InputField
              label="CC"
              placeholder="cc@example.com"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
            <InputField
              label="BCC"
              placeholder="bcc@example.com"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
            /> */}
          </div>

          {/* Subject */}
          <InputField
            label="Subject"
            placeholder="subjects"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          {/* Email Body */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Message
            </label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your email here..."
              className="w-full min-h-[200px] border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Attachments */}
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer text-blue-600 hover:text-blue-800">
              <Paperclip className="w-5 h-5" />
              <span className="text-sm">Attach File</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 whitespace-nowrap hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 whitespace-nowrap hover:bg-gray-300 transition flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Draft</span>
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition flex items-center space-x-2 "
              //   onClick={}
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* Reusable Input Field */
function InputField({ label, placeholder, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
}
