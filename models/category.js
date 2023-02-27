const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
  },
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
