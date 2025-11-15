import Email from "../models/Email.js";
import User from "../models/User.js";

//@desc get all mails --> done --> works
export const getMails = async (req, res) => {
  const user = req.user;

  const email = await User.findById(user._id)
    .select("emails")
    .populate("emails");

  return res.status(201).json({
    code: 201,
    status: "success",

    data: email,
  });
};

// @desc Send mail --> done --> works
export const sendEmail = async (req, res) => {
  const { from, to, message, ...rest } = req.body;
  if (!to || !from || !message) {
    return res.status(400).json({
      code: 400,
      status: "failed",
      message: "Please provide recipient and content",
    });
  }
  try {
    const email = await Email({
      type: "sent",
      from,
      to,
      message,
      ...rest,
    });

    if (from === to) {
      const receiver = await User.findOne({ email: to }).select("-password");
      if (!receiver)
        return res.json({
          code: 500,
          status: "failed",
          message: "something went wonrg! Invalid recipent",
        });
      receiver.emails.push(email.id);
      receiver.save();
      email.save();
    } else {
      const receiver = await User.findOne({ email: to }).select("-password");
      const sender = await User.findOne({ email: from }).select("-password");
      if (!receiver || !sender)
        return res.json({
          code: 500,
          status: "failed",
          message: "something went wonrg! Invalid recipent",
        });
      sender.emails.push(email._id);
      receiver.emails.push(email.id);
      sender.save();
      receiver.save();
      email.save();
    }

    console.log("send mail");
    res.status(201).json({
      code: 200,
      status: "success",
      message: "Email sent successfully.",
      email,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, status: "failed", message: error.message });
  }
};

// @desc Delete email --> done -->  works
export const deletemail = async (req, res) => {
  const { id } = req.body.data;
  try {
    const email = await Email.findById(id);
    if (!email)
      return res
        .status(404)
        .json({ code: 404, status: "failed", message: "Email not found" });

    email.deleted = !email.deleted;
    await email.save();

    res.json({
      code: 200,
      status: "success",
      message: `${
        email.deleted ? "Email moved to trash" : "Email removed from trash"
      }`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, status: "failed", message: error.message });
  }
};

// @desc Mark email as read --> done --> works
export const markRead = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const email = await Email.findById(id);
    if (!email)
      return res
        .status(404)
        .json({ code: 404, status: "failed", message: "Email not found" });

    email.read = !email.read;
    await email.save();

    res.json({
      code: 200,
      status: "success",
      message: `Mail ${email.read ? "read" : "unread"}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, status: "failed", message: error.message });
  }
};

// @desc Star / unstar email  --> done --> works
export const toggleStar = async (req, res) => {
  const { id } = req.body;
  try {
    const email = await Email.findById(id);
    if (!email)
      return res
        .status(404)
        .json({ code: 404, status: "failed", message: "Email not found" });

    email.starred = !email.starred;
    await email.save();

    res.json({
      code: 200,
      status: "success",
      message: `Mail ${email.starred ? "starred" : "unstarred"}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, status: "failed", message: error.message });
  }
};

// @desc archived / unarchived email --> done --> works
export const toggleArchived = async (req, res) => {
  const { id } = req.body;
  try {
    const email = await Email.findById(id);
    if (!email)
      return res
        .status(404)
        .json({ code: 404, status: "failed", message: "Email not found" });

    email.archived = !email.archived;
    await email.save();
    res.json({
      code: 200,
      status: "success",
      message: `Email ${email.archived ? "unarchived" : "archived"}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, status: "failed", message: error.message });
  }
};

// @desc Get inbox (received mails)
export const getInbox = async (req, res) => {
  try {
    const mails = await Mail.find({ to: req.user.mail, deleted: false }).sort({
      createdAt: -1,
    });
    res.json(mails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get sent mails
export const getSent = async (req, res) => {
  const { id } = req.body;
  try {
    const mails = await Mail.find({ from: id, deleted: false }).sort({
      createdAt: -1,
    });
    res.json(mails);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get mail by ID
export const getMailById = async (req, res) => {
  try {
    const mail = await Mail.findById(req.params.id);
    if (!mail) return res.status(404).json({ message: "Mail not found" });
    res.json(mail);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
