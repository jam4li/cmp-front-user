export default {
  log: function (...args) {
    if (process.env.NODE_ENV === "development") {
      console.log(...args);
    }
  },
  // If you need other console methods, you can add them similarly
  warn: function (...args) {
    if (process.env.NODE_ENV === "development") {
      console.warn(...args);
    }
  },
  error: function (...args) {
    if (process.env.NODE_ENV === "development") {
      console.error(...args);
    }
  },
};
