const Meeting = require("../models/Meeting");
const asyncHandler = require("express-async-handler");

// @route POST /meeting
// @desc Create a meeting
// @access Private
exports.createMeeting = asyncHandler(async (req, res, next) => {
  const { userId, name, duration } = req.body;
  const validDuration = [15, 30, 45, 60];

  if (
    !userId ||
    !duration ||
    !name.trim() ||
    !validDuration.includes(duration)
  ) {
    res.status(400);
    throw new Error("Invalid meeting data");
  }

  const meeting = await Meeting.create({ userId, name, duration });

  res.status(201).json({
    success: {
      meeting: {
        username: meeting.userId,
        name: meeting.name,
        duration: meeting.duration,
      },
    },
  });
});

// @route GET /meeting
// @desc Get the list of meetings for logged in user
// @access Private
exports.getMeeting = asyncHandler(async (req, res, next) => {
  if (!req.query.userId) {
    res.status(400);
    throw new Error("Invalid userId");
  }

  const meetings = await Meeting.find({
    userId: req.query.userId,
  });

  if (meetings.length > 0) {
    res.status(200).json({
      success: {
        data: meetings,
      },
    });
  } else {
    res.status(404);
    throw new Error("No meetings found for this logged in user");
  }
});

// @route GET /meeting/:id
// @desc Get all of the meeting information associated with id.
// @access Public
exports.getMeetingInfo = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const meeting = await Meeting.findById(id);

  if (!meeting) {
    res.status(404);
    throw new Error("No meeting found with given id");
  }

  res.status(200).json({ success: { meeting: meeting } });
});

// @route PATCH /meeting/:id
// @desc Edit the meeting information associated with id.
// @access Public
exports.editMeetingInfo = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  const options = { new: true };

  const editted = await Meeting.findByIdAndUpdate(id, updates, options);

  if (!editted) {
    res.status(400);
    throw new Error("Meeting with the given id could not be updated.");
  }

  res.status(200).json({ success: { meeting: editted } });
});
