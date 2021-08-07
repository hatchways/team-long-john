const Meeting = require("../models/Meeting");
const asyncHandler = require("express-async-handler");

exports.validatePublicEvent = asyncHandler(async (req, res, next) => {
  const { categoryId, hostUserName, hostEmail, events } = req.body;

  // Checking for valid input
  if (!categoryId || !hostUserName.trim() || !hostEmail.trim()) {
    res.sendStatus(406);
  }
  if (events) {
    for (let event in events) {
      if (!(event instanceof Meeting)) {
        res.sendStatus(406);
      }
    }
  }
  // Prevent another creation of the same category-user combination.
  const query = { categoryId: categoryId, hostUserName: hostUserName };
  const preExisting = await PublicEvent.findOne(query);
  if (preExisting) {
    res.sendStatus(400);
    throw new Error(`Public event with given combination already exists.`);
  }
  // We are good to move on.
  next();
});

exports.validateCombination = (req, res, next) => {
  const { categoryId, hostUserName } = req.query;

  if (!categoryId && !hostUserName) {
    res.sendStatus(404);
    throw new Error(`Please provide valid query request.`);
  }

  // We are good to move on.
  next();
};

exports.validateCombPatch = asyncHandler(async (req, res, next) => {
  const { categoryId, hostUserName } = req.query;
  const { meetingId } = req.body;

  if (!categoryId || !hostUserName || !meetingId) {
    res.sendStatus(400);
    throw new Error(`Please provide valid query and request body.`);
  }

  const publicEvents = await PublicEvent.findOne(req.query);
  if (!publicEvents) {
    res.sendStatus(404);
    throw new Error(
      `Public event of the given category - user combination not found.`
    );
  } else if (publicEvents.meetings.includes(meetingId)) {
    res.sendStatus(400);
    throw new Error(`Public event already has following event.`);
  }

  // We are good to move on.
  next();
});

exports.validateCombDel = asyncHandler(async (req, res, next) => {
  const { categoryId, hostUserName } = req.query;
  const { meetingId } = req.body;

  if (!categoryId || !hostUserName || !meetingId) {
    res.sendStatus(400);
    throw new Error(`Please provide valid query and request body.`);
  }

  const publicEvents = await PublicEvent.findOne(req.query);
  if (!publicEvents) {
    res.sendStatus(404);
    throw new Error(
      `Public event of the given category - user combination not found.`
    );
  } else if (!publicEvents.meetings.includes(meetingId)) {
    res.sendStatus(400);
    throw new Error(`Public event does not have the following event.`);
  }

  // We are good to move on.
  next();
});
