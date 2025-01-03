import axios from "axios";

const api = axios.create({
  baseURL: "https://server-invoice.vercel.app", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,  
});

export default api;