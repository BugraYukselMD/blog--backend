const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  imageUrl: {
    type: String,
    default: "default.png",
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: String,
  resetTokenExpiration: Date,
  isAdmin: {
    type: Boolean,
    default: false,
  },
  favourites: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
    },
  ],
});

userSchema.methods.addFavourites = function (blogid) {
  const updatedFavourites = [...this.favourites];
  updatedFavourites.push({
    _id: blogid,
  });
  this.favourites = updatedFavourites;
  return this.save();
};

userSchema.methods.deleteFavourite = function (blogid) {
  const currentFavourites = [...this.favourites];
  const updatedFavourites = [];

  currentFavourites.forEach((favourite) => {
    if (!(favourite.toString() == blogid.toString())) {
      updatedFavourites.push(favourite);
    }
  });

  this.favourites = updatedFavourites;
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
