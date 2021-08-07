const PublicEvent = require("../models/PublicEvent");
const asyncHandler = require("express-async-handler");

// @route POST /publicEvent
// @desc Creates a public event.
// @access Public
exports.createPublicEvent = asyncHandler(async (req, res, next) => {
  // Creates a new category.
  const publicEvent = await PublicEvent.create(req.body);
  if (!publicEvent) {
    res.status(406);
    throw new Error("Public Event creation failed.");
  }
  res.status(201).json({ success: { publicEvent: publicEvent } });
});

// @route GET /publicEvent?categoryId=...&hostUserName=...
// @desc Get all Meetings (events) hosted by specific user, under specific category.
// @access Public
exports.findPublicEventByComb = asyncHandler(async (req, res, next) => {
  const publicEvents = await PublicEvent.find(req.query);

  if (!publicEvents) {
    res.status(404);
    throw new Error(`No public events exists with the given combination.`);
  }

  res.status(200).json({
    success: {
      publicEvents: publicEvents,
    },
  });
});

// @route GET /publicEvent/:id
// @desc Get public event information with specific id.
// @access Public
exports.findPublicEventById = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const publicEvents = await PublicEvent.findById(id);

  if (!publicEvents) {
    res.status(404);
    throw new Error(`No public event exists with given id.`);
  }
  res.status(200).json({
    success: {
      publicEvents: publicEvents,
    },
  });
});

// @route PATCH /publicEvent?categoryId=...&hostUserName=...
// @desc Add new public events hosted by specific user, under specific category.
// @access Public
exports.addPublicEvent = asyncHandler(async (req, res, next) => {
  const { meetingId } = req.body;
  options = { new: true };

  const publicEvents = await PublicEvent.findOne(req.query);
  publicEvents.meetings.push(meetingId);
  const updated = await publicEvents.save();

  if (!updated) {
    res.status(400);
    throw new Error("Public Event could not be updated with new item.");
  }

  res.status(200).json({
    success: {
      publicEvents: publicEvents,
    },
  });
});

// @route DELETE /publicEvent?categoryId=...&hostUserName=...
// @desc Deletes a single event with given id.
// @access Public
exports.deletePublicEvent = asyncHandler(async (req, res, next) => {
  const publicEvents = await PublicEvent.findOne(req.query);
  const { meetingId } = req.body;

  const ind = publicEvents.meetings.indexOf(meetingId);
  if (ind > -1) {
    publicEvents.meetings.splice(ind, 1);
  }
  const deleted = await publicEvents.save();

  if (!deleted) {
    res.status(404);
    throw new Error("No category with the given name could be deleted.");
  }

  res.status(200).json({ success: { message: "Category deleted" } });
});
