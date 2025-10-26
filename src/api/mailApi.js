// src/api/mailApi.js
import apiClient from "./apiClient";

export const getInbox = async () => {
  const res = await apiClient.get("/mails/inbox");
  return res.data;
};

export const getSentMails = async () => {
  const res = await apiClient.get("/mails/sent");
  return res.data;
};

export const sendMail = async (to, subject, body) => {
  const res = await apiClient.post("/mails/send", { to, subject, body });
  return res.data;
};

export const deleteMail = async (mailId) => {
  const res = await apiClient.delete(`/mails/${mailId}`);
  return res.data;
};
