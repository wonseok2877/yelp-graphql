const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: String,
  content: String,
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  restaurantId: String,
});

module.exports = mongoose.model("Review", reviewSchema);
