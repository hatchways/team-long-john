const express = require("express");
const router = express.Router();
const passport = require("passport");
const { logOut } = require("../controllers/auth");
const isLoggedIn = require("../middleware/isLoggedIn");

const { isDev } = require("../utils/isDev");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
    accessType: "offline",
    prompt: "consent",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: `https://calendapp-io.herokuapp.com/AuthSetup`,
    failureRedirect: `https://calendapp-io.herokuapp.com/login`,
  })
);

router.get("/logout", isLoggedIn, logOut);

module.exports = router;
