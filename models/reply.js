const mongoose = require("mongoose");
const User = require("./user");

const currentDate = function () {
  var date = new Date();
  mnth = ("0" + (date.getMonth() + 1)).slice(-2);
  day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
};

const replySchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: currentDate(),
  },
});

module.exports = mongoose.model("Reply", replySchema);
