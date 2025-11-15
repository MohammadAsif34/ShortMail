import React, { useState } from "react";
import { Paperclip, Send, X, Save } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { ComposeMailForm } from "./ComposeMailForm";
import { toast } from "react-toastify";
import { sendEmails } from "../../../redux/emailSlice";

const defaultform = {
  to: "",
  from: "",
  subject: "",
  message: "",
};
export default function ComposeMail() {
  const [form, setForm] = useState(defaultform);
  const user = useSelector((s) => s.user.data);
  const email = useSelector((s) => s.email);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    form.from = user.email;
    const sendRes = await dispatch(sendEmails(form));
    if (sendEmails.rejected.match(sendRes)) toast.error("Email sending Failed");
    else {
      if (sendRes.payload.status === "success")
        toast.success(sendRes.payload.message);
      else toast.error("Something went wrong!");
    }
    console.log(sendRes.payload);

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
          loading={email.loading}
        />
      </div>
    </div>
  );
}
