const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /user
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

// @route GET /user
// @desc Sends the logged in user's information back
// @access Public
exports.getUser = asyncHandler(async (req, res, next) => {
  res.send(req.user);
});

// @route PATCH /users/:id
// @desc Update user
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  updates = req.body;
  options = { new: true };

  const user = await User.findByIdAndUpdate(id, updates, options);

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        register_date: user.register_date,
        timezone: user.timezone,
        availableHours: user.availableHours,
        availableDays: user.availableDays
      }
    }
  });
});
