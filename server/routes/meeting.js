const express = require("express");
const router = express.Router();
const {
  createMeeting,
  getMeeting,
  getMeetingInfo,
  editMeetingInfo,
} = require("../controllers/meeting");

router.route("/").post(createMeeting);
router.route("/").get(getMeeting);
router.route("/:id").get(getMeetingInfo);
router.route("/:id").patch(editMeetingInfo);

module.exports = router;
