import React from "react";
import { Inbox, Mail, Search } from "lucide-react";

export default function NoMailFound({ type = "inbox" }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-10">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute -inset-4 bg-blue-100 rounded-full blur-2xl opacity-30" />
        <Mail className="w-20 h-20 text-blue-500 relative z-10" />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {type === "search" ? "No Results Found" : "No Emails Found"}
      </h2>

      {/* Description */}
      <p className="text-gray-500 max-w-sm">
        {type === "search"
          ? "We couldn’t find any emails matching your search. Try adjusting your keywords or filters."
          : "Looks like your inbox is clean and organized! New emails will appear here."}
      </p>

      {/* Optional Button */}
      {type === "inbox" && (
        <button className="mt-6 flex items-center space-x-2 bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700 transition">
          <Search className="w-4 h-4" />
          <span>Check for New Mail</span>
        </button>
      )}
    </div>
  );
}
