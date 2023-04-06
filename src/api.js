// api.js
import axios from "axios";
import Cookies from "js-cookie";
import dotenv from "dotenv";
import logger from "@/logger.js";

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

// Request interceptor
instance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = Cookies.get("authToken");

    if (token && token.length > 0) {
      config.headers.Authorization = `Token ${token}`;
      logger.log("Token is set");
    } else {
      logger.log("Token is not set");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
