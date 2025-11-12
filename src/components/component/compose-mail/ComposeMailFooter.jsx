import { Save, Send } from "lucide-react";
import React from "react";

export const ComposeMailFooter = () => {
  return (
    <>
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
    </>
  );
};
