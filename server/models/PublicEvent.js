const mongoose = require("mongoose");

const publicEventSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Types.ObjectId,
    ref: "category",
    required: true,
  },
  hostUserName: {
    type: String,
    required: true,
  },
  hostEmail: {
    type: String,
    required: true,
  },
  events: {
    type: [String],
    default: [],
  },
});

module.exports = PublicEvent = mongoose.model("publicEvent", publicEventSchema);
