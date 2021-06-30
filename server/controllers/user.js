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

    if (!user) res.status(404).send({ error: "User not found" });
    else res.status(200).send(user);
});

// @route PATCH /users/:id
// @desc Update user
// @access Private
exports.updateUser = asyncHandler(async (req, res, next) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
    if (!isValidOperation) return res.status(404).send({ error: 'Invalid update' });

    const user = await User.findById({ _id: req.params.id });
    if (!user) return res.status(404).send({ error: "User not found" });

    try{
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        res.send(user);
    } catch (e) {
        res.status(400).send(e);
    }
});
