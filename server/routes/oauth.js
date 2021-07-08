const express = require("express");
const router = express.Router();
const passport = require("passport");
const { loadUser, logOut, doesUserExist } = require("../controllers/oauth");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/user", doesUserExist);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
    accessType: "offline"
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/dashboard"
  })
);

router.get("/user", loadUser);
router.get("/logout", logOut);

module.exports = router;
