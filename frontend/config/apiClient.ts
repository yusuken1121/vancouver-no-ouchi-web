import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL || "localhost:3000", // API server
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
