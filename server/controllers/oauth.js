const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const generator = require('generate-password');

// @route GET /login/user
// @desc Login user
// @access Public
exports.loginUser = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.user.email })

    if (!user){
    res.status(401);
    throw new Error("There's no account for this email. Try logging in with a different email.");
    }

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      }
    });
});

