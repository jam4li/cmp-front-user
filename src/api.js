// api.js
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  withCredentials: true,
  crossDomain: true,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
