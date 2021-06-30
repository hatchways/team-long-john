const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers, getUser, updateUser } = require("../controllers/user");

router.route("/").get(protect, searchUsers);

router.route("/users/:username").get(getUser);

router.route("/users/:id").patch(updateUser);

module.exports = router;
