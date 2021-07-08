const express = require("express");
const router = express.Router();
const passport = require("passport");
const { logOut } = require("../controllers/auth");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard"
  })
);

router.get("/logout", isLoggedIn, logOut);

module.exports = router;
