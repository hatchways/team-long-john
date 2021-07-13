const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /users
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

// @route GET /users/me
// @desc Sends the logged in user's information back
// @access Public
exports.getUser = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: {
      message: `Account information for ${req.user.username}`,
      user: req.user,
    }
  });
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

// @route POST /users/username/
// @desc Update user
// @access Private
exports.userNameExist = asyncHandler(async (req, res, next) => {
  const { username } = req.body;

  const user = await User.findOne({ username: username });
  console.log(user);

  if (!user) {
    res.status(404);
    throw new Error(`No account exists with the username: ${username}`);
  }

  res.status(200).json({
    success: {
      message: "Account with this username exists",
    },
  });
});

// @route PATCH /users/email/:email
// @desc Update user
// @access Private
exports.updateUserByEmail = asyncHandler(async (req, res, next) => {
  const email = req.params.email;
  updates = req.body;
  options = { new: true };

  const query = { email: email };
  const user = await User.findOneAndUpdate(query, updates, options);

  if (!user) {
    res.status(404);
    throw new Error(`No account exists with the email: ${email}`);
  }

  res.status(200).json({
    success: {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        register_date: user.register_date,
        timezone: user.timezone,
        availableHours: user.availableHours,
        availableDays: user.availableDays,
      },
    },
  });
});
