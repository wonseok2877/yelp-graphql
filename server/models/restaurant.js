const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  location: String,
  priceRange: {
    type: Number,
    min: 1,
    max: 5,
  },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
