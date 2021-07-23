const mongoose = require("mongoose");
const Meeting = require("./Meeting");

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
  meetings: {
    type: [mongoose.Types.ObjectId],
    default: [],
  },
});

module.exports = PublicEvent = mongoose.model("publicEvent", publicEventSchema);
