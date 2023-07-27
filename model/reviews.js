const mongoose = require("mongoose");

//create schema to save employee reviews
const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: "string",
      required: true,
    },
    reviewedFor: {
      type: "string",
      required: true,
    },
    reviewedForEmail: {
      type: "string",
      required: true,
    },
    reviewedBy: {
      type: "string",
      required: true,
    },
    reviewedByEmail: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewSchema);

module.exports = Reviews;
