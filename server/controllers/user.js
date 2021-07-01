const User = require("../models/User");
const asyncHandler = require("express-async-handler");

// @route POST /users
// @desc Search for users
// @access Private
exports.searchUsers = asyncHandler(async (req, res, next) => {
  const searchString = req.query.search;

  let users;
  if (searchString) {
    users = await User.find({
      username: { $regex: searchString, $options: "i" }
    });
  }

  if (!users) {
    res.status(404);
    throw new Error("No users found in search");
  }

  res.status(200).json({ users: users });
});

// @route GET /users/:username
// @desc Get a user by username
// @access Private
exports.getUser = asyncHandler(async (req, res, next) => {
    const username = req.params.username
    const user = await User.findOne({ username });

    if (!user) {
        res.status(404);
        throw new Error("User not found" );
    }

    res.status(200).json({
        success: {
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
            register_date: user.register_date
       }
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
            register_date: user.register_date
       }
    }
  });
});
