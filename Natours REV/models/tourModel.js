const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A Tour Must Have A Name"],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, "A Tour Must Have A Duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A Tour Must Have A Group Size"],
  },
  difficulty: {
    type: String,
    required: [true, "A Tour Must Have A Difficulty"],
    trim: true,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, "A Tour Must Have A Price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [true, "A Tour Must Have A Description"],
  },
  imageCover: {
    type: String,
    required: [true, "A Tour Must Have A Cover Image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startAt: [Date],
});

const Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;
