import React, { useState } from "react";
import { Paperclip, Send, X, Save } from "lucide-react";
import { useSelector } from "react-redux";
import { ComposeMailForm } from "./ComposeMailForm";
import { sendMail } from "../../../api/actions";

const defaultform = {
  to: "",
  from: "",
  subject: "",
  message: "",
};
export default function ComposeMail() {
  const [form, setForm] = useState(defaultform);
  const user = useSelector((s) => s.user.data);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    form.from = user.mail;
    console.log(form);
    // const send = async () => {
    const res = await sendMail({
      from: form.from,
      to: form.to,
      subject: form.subject,
      message: form.message,
    });
    console.log(res);
    if (res.status == "success") alert(res.message);
    else console.warn(res.message);
    // };
    // send();
    // console.log(form);
    // alert("Email Sent! ✅");
    window.history.back();
  };

  return (
    <div className="fixed right-0 inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-50 animate-fadeIn ">
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-[700px] max-h-[90vh] overflow-y-auto p-6 relative border-2 border-gray-100">
        {/* Close Button */}
        <button
          onClick={() => window.history.back()}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-[-10px]">
          Compose Email
        </h2>

        {/* Form */}
        <ComposeMailForm
          form={form}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
