import React from "react";
import {
  Mail,
  Send,
  Archive,
  Trash2,
  Inbox,
  Star,
  Settings,
  LogOut,
  Search,
  Plus,
} from "lucide-react";
// import Sidebar from "./components/dashboard/Sidebar";
// import Header from "./components/dashboard/Header";
// import MailList from "./components/dashboard/MailList";
// import MailMessage from "./components/section/mail/MailMessage";
// import Setting from "./components/section/setting/Setting";
// import Sidebar from "./components/section/sidebar/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Section */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        {/* <Header /> */}

        {/* Email List */}
        <section className="flex-1 gr id grid-cols-3 border-t=">
          {/* Mail List */}
          <div className="h-[calc(89vh)] overflow-y-auto custom-scroll">
            {/* <MailList /> */}
            {/* <Setting /> */}
            {/* <MailMessage /> */}
          </div>

          {/* Mail Content */}
        </section>
      </main>
    </div>
  );
}
