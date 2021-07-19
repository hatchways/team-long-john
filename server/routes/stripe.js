const express = require("express");
const router = express.Router();

const {} = require("../controllers/stripe");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/pay", isLoggedIn);

module.exports = router;
