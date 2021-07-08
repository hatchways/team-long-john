const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @route POST /auth/user
// @desc Checks if user exists
// @access Public
exports.doesUserExist = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(401);
    throw new Error(`No account exists with the email: ${email}`);
  }

  res.status(200).json({
    success: {
      message: "Account exists"
    }
  });
});

// @route GET /auth/user
// @desc Sends the logged in user's information back
// @access Public
exports.loadUser = asyncHandler(async (req, res, next) => {
  res.send(req.user);
});

// @route GET /auth/logout
// @desc Logs the user out and redirects them to the login page
// @access Public
exports.logOut = async (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) return next(err);

    res.redirect(`${process.env.CALEND_APP_DEV_URL}/login`);
  });
};
