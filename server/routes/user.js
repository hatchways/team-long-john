const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  searchUsers,
  getUser,
  updateUser,
  getUserByEmail,
} = require("../controllers/user");

router.route("/").get(protect, searchUsers);

router.route("/:username").get(getUser);

router.route("/email/:userEmail").get(getUserByEmail);

router.route("/:id").patch(updateUser);

module.exports = router;
