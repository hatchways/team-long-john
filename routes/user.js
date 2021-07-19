const express = require("express");
const router = express.Router();

const {
  doesUserExist,
  getUser,
  updateUser,
  userNameExist,
  updateUserByEmail,
} = require("../controllers/user");
const { validateUpdateUser } = require("../utils/validate");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/", doesUserExist);
router.get("/me", isLoggedIn, getUser);
router.patch("/:id", validateUpdateUser, updateUser);
router.post("/username", userNameExist);
router.route("/email/:email").patch(updateUserByEmail);

module.exports = router;
