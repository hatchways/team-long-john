const Meeting = require("./Meeting");

exports.validatePublicEvent = (req, res, next) => {
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
  }
  // We are good to move on.
  next();
};

exports.validateCombination = (req, res, next) => {
  const { categoryId, hostUserName } = req.query;

  if (!categoryId || !hostUserName) {
    res.sendStatus(404);
  }

  // We are good to move on.
  next();
};

exports.validateCombPatch = (req, res, next) => {
  const { categoryId, hostUserName } = req.query;
  const { meetingId } = req.body;

  if (!categoryId || !hostUserName || meetingId) {
    res.sendStatus(404);
  }

  const publicEvents = await PublicEvent.findOne(req.query);
  if (!publicEvents || !publicEvents.meetings.includes(meetingId)) {
    res.sendStatus(404);
  }

  // We are good to move on.
  next();
};
