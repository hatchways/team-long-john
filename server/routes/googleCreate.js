const express = require("express");
const router = express.Router();

const { createGoogleEvent } = require("../controllers/googleCreate");
const isLoggedIn = require("../middleware/isLoggedIn");

// router.post("/", isLoggedIn, createGoogleEvent);
router.post("/", createGoogleEvent);

module.exports = router;
