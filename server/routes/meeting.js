const express = require("express");
const router = express.Router();
const {
  createMeeting,
  getMeeting,
  getMeetingInfo,
} = require("../controllers/meeting");

router.route("/").post(createMeeting);
router.route("/").get(getMeeting);
router.route("/:id").get(getMeetingInfo);

module.exports = router;
