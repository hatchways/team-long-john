const express = require("express");
const router = express.Router();

const { handlePayment } = require("../controllers/stripe");

router.post("/pay", handlePayment);

module.exports = router;
