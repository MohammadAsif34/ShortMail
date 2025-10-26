// src/api/authApi.js
import apiClient from "./apiClient";

export const loginUser = async (email, password) => {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data; // { token, user: { id, name, email } }
};

export const registerUser = async (name, email, password) => {
  const res = await apiClient.post("/auth/register", { name, email, password });
  return res.data;
};

export const getUserDetails = async () => {
  const res = await apiClient.get("/auth/me");
  return res.data; // user details
};
