import mongoose from "mongoose";

const emailSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default: "(No Subject)",
    },
    message: {
      type: String,
    },
    html: {
      type: String,
    },
    type: {
      type: String,
      enum: ["inbox", "sent", "draft"],
      default: "inbox",
    },
    read: {
      type: Boolean,
      default: false,
    },
    starred: {
      type: Boolean,
      default: false,
    },
    archived: {
      type: Boolean,
      default: false,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Email = mongoose.model("emails", emailSchema);
export default Email;
