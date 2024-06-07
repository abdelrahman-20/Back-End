const validator = require("validator");
const Mongoose = require("mongoose");
const slugify = require("slugify");

const tourSchema = new Mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "The Tour Must Have A Name."],
      maxlength: [50, "Tour Name Must Max Length of 50 Characters"],
      minlength: [15, "Tour Name Must Minimum Length of 50 Characters"],
      validate: [validator.isAlpha, "Tour Name Must Contain Characterss Only"],
    },
    slug: String,
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
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return this.price > val;
        },
        message: "Discount ({val}) Must Be Below Original Price",
      },
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Document Middleware "Run Before Save Command":
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Tour = Mongoose.model("Tour", tourSchema);

module.exports = Tour;
