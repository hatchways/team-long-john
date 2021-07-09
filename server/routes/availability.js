const express = require("express");
const router = express.Router();

const { getAvailability } = require("../controllers/availability");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", getAvailability);

module.exports = router;
