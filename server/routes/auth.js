const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  loadUser,
  logOut,
  loginUser,
  doesUserExist
} = require("../controllers/auth");
const protect = require("../middlewares/protect");

router.post("/user", doesUserExist);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] }, loginUser)
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CALEND_APP_DEV_URL}/dashboard`
  })
);

router.get("/user", protect, loadUser);
router.get("/logout", protect, logOut);

module.exports = router;
