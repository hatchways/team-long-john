const express = require("express");
const router = express.Router();
const passport = require("passport");
const { logOut } = require("../controllers/auth");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
    accessType: "offline",
    prompt: "consent"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `${process.env.CALEND_APP_DEV_URL}/AuthSetup`,
    failureRedirect: `${process.env.CALEND_APP_DEV_URL}/login`  
  })
);

router.get("/logout", isLoggedIn, logOut);

module.exports = router;
