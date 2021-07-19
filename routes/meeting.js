const express = require("express");
const router = express.Router();
const { createMeeting, getMeeting } = require("../controllers/meeting");

router.route("/").post(createMeeting);

router.route("/").get(getMeeting);

module.exports = router;
