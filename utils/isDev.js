module.exports.isDev = () => {
  return process.env.NODE_ENV === "development"
    ? process.env.DEV_URL
    : process.env.PROD_URL;
};
