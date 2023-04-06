module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: ["plugin:vue/essential", "@vue/prettier"],

  rules: {
    "no-console": "off", // This will allow console statements in production which is not recommended
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
  },

  parserOptions: {
    parser: "babel-eslint",
  },
};
