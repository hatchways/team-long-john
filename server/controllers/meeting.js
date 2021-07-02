const Meeting = require("../models/Meeting");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

// @route POST /meeting
// @desc Create a meeting
// @access Private
exports.createMeeting = asyncHandler(async (req, res, next) => {
  const { userId, duration } = req.body;
  const validDuration = ["15", "30", "45"];

  if (
    !userId ||
    !duration ||
    !mongoose.isValidObjectId(userId) ||
    !validDuration.includes(duration)
  ) {
    res.status(400);
    throw new Error("Invalid meeting data");
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
  const { userId } = req.body;
  if (!userId || !mongoose.isValidObjectId(userId)) {
    res.status(400);
    throw new Error("Invalid userId");
  }

  const meetings = await Meeting.find({
    userId: userId,
  });

  if (meetings.length > 0) {
    res.status(200).send(meetings);
  } else {
    res.status(404);
    throw new Error("No meetings found for this logged in user");
  }
});
