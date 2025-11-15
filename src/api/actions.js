import apiClient from "./apiClient";

// @desc send email --> done --> works
export const sendMail = async ({ from, to, subject, message }) => {
  console.log({ from, to, subject, message });
  const res = await apiClient.post("/email/send", {
    from,
    to,
    subject,
    message,
  });
  console.log(res.data);
  return res.data;
};

export const ReadMail = async ({ id }) => {
  const res = await apiClient.put("mail/read", { id });
  return res.data;
};

export const TrashMail = async ({ id }) => {
  const data = { data: { id } };
  console.log(data);
  const res = await apiClient.delete("mail/trash", { data });
  return res.data;
};

export const StarredMail = async ({ id }) => {
  // console.log(data);
  const res = await apiClient.put("mail/starred", { id });
  return res.data;
};
