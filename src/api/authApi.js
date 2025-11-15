// src/api/authApi.js
import apiClient from "./apiClient";

// login --> done --> works
export const loginUser = async (email, password) => {
  const res = await apiClient.post("/auth/login", { email, password });
  return res.data; // { token, user: { id, name, email } }
};

// register --> done --> works
export const registerUser = async (fullname, email, password) => {
  const res = await apiClient.post("/auth/register", {
    fullname,
    email,
    password,
  });
  return res.data;
};

export const getUserDetails = async () => {
  const res = await apiClient.get("/auth/me");
  return res.data; // user details
};
