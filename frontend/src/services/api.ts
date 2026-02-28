import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api",
});

// 🔐 Attach JWT token automatically to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;