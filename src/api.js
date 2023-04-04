// api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://mocki.io/v1", // Replace with your API base URL
  timeout: 5000, // Set a timeout for the requests
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
