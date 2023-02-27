const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  linkName: {
    type: String,
    required: true,
    trim: true,
  },
  linkImage: {
    type: String,
    required: true,
    trim: true,
  },
  linkUrl: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Link", linkSchema);
