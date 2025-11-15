import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Please add a name"],
    },
    nickname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Please add an mail"],
      unique: true,
    },
    recovery_email: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    dob: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "/default_avatar.png",
    },
    phone: {
      type: Number,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    mode: { type: String, enum: ["dark", "light"], default: "light" },
    emails: [{ type: mongoose.Schema.Types.ObjectId, ref: "emails" }],
  },
  { timestamps: true }
);
const User = mongoose.model("users", userSchema);
export default User;
