const Meeting = require("../models/Meeting");
const asyncHandler = require("express-async-handler");

// @route POST /meeting
// @desc Create a meeting
// @access Private
exports.createMeeting = asyncHandler(async (req, res, next) => {
  try {
    const meeting = await Meeting.create(req.body);

    res.status(201).json({
      success: {
        meeting: {
          username: meeting.userId,
          duration: meeting.duration,
        },
      },
    });
  } catch {
    res.status(400);
    throw new Error("Invalid meeting data");
  }
});

// @route GET /meeting
// @desc Get the list of meetings for logged in user
// @access Private
exports.getMeeting = asyncHandler(async (req, res, next) => {
  try {
    const { userId } = req.body;
    const meetings = await Meeting.find({
      userId: userId,
    });

    if (meetings.length > 0) {
      res.status(200).send(meetings);
    } else {
      res.status(404);
      throw new Error("No meetings found for this logged in user");
    }
  } catch {
    res.status(400);
    throw new Error("Invalid user Id");
  }
});
