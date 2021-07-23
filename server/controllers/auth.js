const asyncHandler = require("express-async-handler");
const { isDev } = require("../utils/isDev");

// @route GET /auth/logout
// @desc Logs the user out and redirects them to the login page
// @access Public
exports.logOut = asyncHandler(async (req, res, next) => {
  req.logout();
  res.redirect(`${isDev()}/login`);
});
