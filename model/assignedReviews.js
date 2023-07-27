const mongoose = require("mongoose");

//create new schema for review task Assigned to user
const assignedReviewSchema = new mongoose.Schema(
  {
    reviewedFor: {
      type: "string",
      required: true,
    },
    reviewedBy: {
      type: "string",
      required: true,
    },
    assignedBy: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AssignedReviews = mongoose.model("AssignedReviews", assignedReviewSchema);

module.exports = AssignedReviews;
