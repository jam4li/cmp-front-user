const logger = {
  log: function (...args: any[]): void {
    if (process.env.NODE_ENV === "development") {
      console.log(...args);
    }
  },
  // If you need other console methods, you can add them similarly
  warn: function (...args: any[]): void {
    if (process.env.NODE_ENV === "development") {
      console.warn(...args);
    }
  },
  error: function (...args: any[]): void {
    if (process.env.NODE_ENV === "development") {
      console.error(...args);
    }
  },
};

export default logger;
