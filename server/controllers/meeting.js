const Meeting = require("../models/Meeting");
const asyncHandler = require("express-async-handler");

// @route POST /meeting
// @desc Create a meeting
// @access Private
exports.createMeeting = asyncHandler(async (req, res, next) => {
  const { userId, duration } = req.body;
  const validDuration = [15, 30, 45, 60];

  if (!userId || !duration || !validDuration.includes(duration)) {
    res.status(400);
    throw new Error("Invalid meeting data");
  }

  const meetings = await Meeting.find({ userId: userId });

  // Checking is user already has this event
  for (let i = 0; i < meetings.length; i++) {
    if (meetings[i].duration === duration) {
      res.status(406);
      throw new Error("You already have this type of event");
    }
  }

  const meeting = await Meeting.create({ userId, duration });

  res.status(201).json({
    success: {
      meeting: {
        username: meeting.userId,
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
