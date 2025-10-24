import React, { useState } from "react";
import {
  User,
  Bell,
  Palette,
  Lock,
  Globe,
  Save,
  ChevronRight,
  ClosedCaption,
  DoorClosed,
  X,
  HelpCircle,
  Info,
} from "lucide-react";

const Setting = ({ setOpen }) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex h-full bg-gray-50 text-gray-800  overflow-hidden border border-gray-200 ">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white shadow-md border-r border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-xl font-semibold text-blue-600">Settings</h2>
        </div>

        <nav className="mt-4 space-y-1">
          <SettingsTab
            icon={<User className="w-5 h-5" />}
            label="Profile"
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
          />
          <SettingsTab
            icon={<Globe className="w-5 h-5" />}
            label="Account"
            active={activeTab === "account"}
            onClick={() => setActiveTab("account")}
          />
          <SettingsTab
            icon={<Bell className="w-5 h-5" />}
            label="Notifications"
            active={activeTab === "notifications"}
            onClick={() => setActiveTab("notifications")}
          />
          <SettingsTab
            icon={<Palette className="w-5 h-5" />}
            label="Appearance"
            active={activeTab === "appearance"}
            onClick={() => setActiveTab("appearance")}
          />
          <SettingsTab
            icon={<Lock className="w-5 h-5" />}
            label="Security"
            active={activeTab === "security"}
            onClick={() => setActiveTab("security")}
          />
          <SettingsTab
            icon={<HelpCircle className="w-5 h-5" />}
            label="Help & Support"
            active={activeTab === "helpsupport"}
            onClick={() => setActiveTab("helpsupport")}
          />
          <SettingsTab
            icon={<Info className="w-5 h-5" />}
            label="Privacy Policy"
            active={activeTab === "privacypolicy"}
            onClick={() => setActiveTab("privacypolicy")}
          />
        </nav>
      </aside>

      {/* Right Content Area */}
      <button
        className="absolute right-3 top-3 cursor-pointer "
        onClick={() => setOpen((p) => !p)}
      >
        <X className="text-gray-300 hover:text-gray-500 transition-all duration-300 " />
      </button>
      <main className="flex-1 p-8 overflow-y-auto bg-white shadow-inner">
        {activeTab === "profile" && <ProfileSettings />}
        {activeTab === "account" && <AccountSettings />}
        {activeTab === "notifications" && <NotificationSettings />}
        {activeTab === "appearance" && <AppearanceSettings />}
        {activeTab === "security" && <SecuritySettings />}
        {activeTab === "helpsupport" && <HelpSupport />}
        {activeTab === "privacypolicy" && <PrivacyPolicy />}
      </main>
    </div>
  );
};
export default Setting;
/* --------------------------------
   Settings Sidebar Item Component
-------------------------------- */
function SettingsTab({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-5 py-3 text-sm transition-all ease-linear duration-150 ${
        active
          ? "bg-blue-100 text-blue-600 border-l-4 border-blue-600"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <span className="flex items-center space-x-3">
        {icon}
        <span>{label}</span>
      </span>
      <ChevronRight className="w-4 h-4 opacity-60" />
    </button>
  );
}

/* --------------------------------
   Individual Tab Components
-------------------------------- */
function ProfileSettings() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
      <div className="grid grid-cols-1 gap-4">
        <InputField label="Full Name" placeholder="John Doe" />
        <InputField label="Email" placeholder="john@imail.in" />
        <InputField label="Phone Number" placeholder="+91 9876543210" />
        <InputField label="Location" placeholder="Kolkata, India" />
      </div>
      <SaveButton />
    </section>
  );
}

function AccountSettings() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
      <div className="space-y-4">
        <InputField label="Username" placeholder="john_doe" />
        <InputField label="Recovery Email" placeholder="backup@mail.com" />
        <InputField label="Language" placeholder="English (India)" />
      </div>
      <SaveButton />
    </section>
  );
}

function NotificationSettings() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Notification Settings</h2>
      <div className="space-y-4">
        <Toggle label="Email Notifications" />
        <Toggle label="Push Notifications" />
        <Toggle label="Weekly Summary" />
      </div>
      <SaveButton />
    </section>
  );
}

function AppearanceSettings() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Appearance</h2>
      <div className="flex items-center space-x-6">
        <ThemeCard theme="Light" active />
        <ThemeCard theme="Dark" />
      </div>
      <SaveButton />
    </section>
  );
}

function SecuritySettings() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Security Settings</h2>
      <div className="space-y-4">
        <InputField
          label="Current Password"
          placeholder="••••••••"
          type="password"
        />
        <InputField
          label="New Password"
          placeholder="••••••••"
          type="password"
        />
        <InputField
          label="Confirm Password"
          placeholder="••••••••"
          type="password"
        />
      </div>
      <SaveButton />
    </section>
  );
}

/* --------------------------------
   Reusable Components
-------------------------------- */
function InputField({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function Toggle({ label }) {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
      <span>{label}</span>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-10 h-5 flex items-center rounded-full p-1 transition ${
          enabled ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function ThemeCard({ theme, active }) {
  return (
    <div
      className={`w-32 h-20 rounded-xl border-2 cursor-pointer flex items-center justify-center font-medium transition ${
        active
          ? "border-blue-500 bg-blue-50 text-blue-600"
          : "border-gray-300 hover:border-blue-300"
      }`}
    >
      {theme}
    </div>
  );
}

function SaveButton() {
  return (
    <button className="mt-6 flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
      <Save className="w-4 h-4" />
      <span>Save Changes</span>
    </button>
  );
}

import { Mail, MessageCircle, LifeBuoy } from "lucide-react";

const HelpSupport = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center mb-4 space-x-2">
        <LifeBuoy className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Help & Support</h3>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4">
        Need help with I-Mail.in? We’re here to assist you with any issue or
        question you might have.
      </p>

      <ul className="space-y-2 text-sm text-gray-700">
        <li className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-blue-500" />
          <span>Email us: support@i-mail.in</span>
        </li>
        <li className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-blue-500" />
          <span>Live chat available Mon–Fri, 9 AM–6 PM</span>
        </li>
      </ul>
    </section>
  );
};

import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center mb-4 space-x-2">
        <Shield className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Privacy Policy</h3>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-3">
        At <strong>I-Mail.in</strong>, we value your privacy. We never share or
        sell your personal information. Your data is securely encrypted and
        stored with industry-standard protection.
      </p>

      <ul className="list-disc pl-6 text-gray-700 text-sm space-y-1">
        <li>Emails and attachments are encrypted end-to-end.</li>
        <li>Your data is not used for advertising or tracking.</li>
        <li>You can delete your account and data at any time.</li>
      </ul>

      <p className="text-xs text-gray-500 mt-4">Last updated: October 2025</p>
    </section>
  );
};
