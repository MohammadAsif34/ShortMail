// src/api/authApi.js
import apiClient from "./apiClient";

export const loginUser = async (mail, password) => {
  const res = await apiClient.post("/auth/login", { mail, password });
  return res.data; // { token, user: { id, name, email } }
};

export const registerUser = async (fullname, mail, password) => {
  const res = await apiClient.post("/auth/register", {
    fullname,
    mail,
    password,
  });
  return res.data;
};

export const getUserDetails = async () => {
  const res = await apiClient.get("/auth/me");
  return res.data; // user details
};
