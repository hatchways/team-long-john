const express = require("express");
const router = express.Router();

const { deleteGoogleEvent } = require("../controllers/googleDelete");
const isLoggedIn = require("../middleware/isLoggedIn");

// router.delete("/", isLoggedIn, deleteGoogleEvent);
router.delete("/", deleteGoogleEvent);

module.exports = router;
