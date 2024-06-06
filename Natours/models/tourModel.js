const Mongoose = require("mongoose");

const tourSchema = new Mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "The Tour Must Have A Name."],
  },
  duration: {
    type: Number,
    required: [true, "The Tour Must Have A Duration."],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "The Tour Must Have A Group Size."],
  },
  difficulty: {
    type: String,
    required: [true, "The Tour Must Have A Difficulty."],
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
    required: [true, "The Tour Must Have A Price."],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, "The Tour Must Have A Summery."],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "The Tour Must Have A Description."],
  },
  imageCover: {
    type: String,
    required: [true, "The Tour Must Have A Cover Image."],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = Mongoose.model("Tour", tourSchema);

module.exports = Tour;
