const express = require("express");
const router = express.Router();

const {
  doesUserExist,
  getUser,
  updateUser,
  userNameExist,
  updateUserByEmail,
} = require("../controllers/user");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/", doesUserExist);
router.get("/me", getUser);
router.route("/:id").patch(updateUser);
router.post("/username", userNameExist);
router.route("/email/:email").patch(updateUserByEmail);

module.exports = router;
