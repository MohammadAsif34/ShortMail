// src/api/apiClient.js
import axios from "axios";
const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_baseURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// import { store } from "../redux/store";
// apiClient.interceptors.request.use((config) => {
//   // const token = localStorage.getItem("token");
//   const token = store.getState().auth.token;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;
