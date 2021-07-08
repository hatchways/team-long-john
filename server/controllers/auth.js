const asyncHandler = require("express-async-handler");

// @route GET /auth/user
// @desc Logs the user out and redirects them to the login page
// @access Public
exports.logOut = asyncHandler(async (req, res, next) => {
  req.logout();
  res.redirect(`${process.env.CALEND_APP_DEV_URL}/login`);
});
