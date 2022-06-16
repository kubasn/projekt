const mongoose = require("mongoose");

const Offer = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  area: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Offer", Offer);
