import express from "express";
import {
  sendEmail,
  getInbox,
  getSent,
  getMailById,
  markRead,
  toggleStar,
  getMails,
  deletemail,
  toggleArchived,
} from "../controllers/emailController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/inbox", protect, getInbox);
router.get("/sent", protect, getSent); // get all sent main
router.get("/:id", protect, getMailById);
router.put("/read", protect, markRead); // mark read  mail
router.put("/starred", protect, toggleStar); // mark star/unstar mail
router.put("/archived", protect, toggleArchived); // mark archived/unarchived mail
router.delete("/trash", protect, deletemail); // delete mail

// done api
router.get("/", protect, getMails); // get all mails
router.post("/send", protect, sendEmail); // send mail

export default router;
