const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20,
  },
  content: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  restaurantId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
