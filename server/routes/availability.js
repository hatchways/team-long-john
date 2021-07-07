const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/isLoggedIn");
const { getAvailability } = require("../controllers/availability");

router.route("/").get(getAvailability);

module.exports = router;
