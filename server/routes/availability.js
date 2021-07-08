const express = require("express");
const router = express.Router();

const { getAvailability } = require("../controllers/availability");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", isLoggedIn, getAvailability);

module.exports = router;
