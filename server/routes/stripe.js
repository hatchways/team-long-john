const express = require("express");
const router = express.Router();

const { handlePayment } = require("../controllers/stripe");
const isLoggedIn = require("../middleware/isLoggedIn");

router.post("/pay", handlePayment);

module.exports = router;
