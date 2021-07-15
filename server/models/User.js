const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String
  },
  google: {
    id: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  register_date: {
    type: Date,
    default: Date.now
  },
  timezone: {
    type: String
  },
  availableHours: {
    type: {
      times: {
        start: String,
        end: String
      }
    },
    default: {
      start: "08:00",
      end: "17:00"
    }
  },
  availableDays: {
    type: [String],
    default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  google: {
    id: {
      type: String
    },
    refreshToken: {
      type: String
    }
  },
  timezone: {
    type: String
  },
  appointments: [
    {
      type: mongoose.Types.ObjectId,
      ref: "appointment"
    }
  ]
});

module.exports = User = mongoose.model("user", userSchema);
