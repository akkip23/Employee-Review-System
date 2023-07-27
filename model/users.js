const mongoose = require("mongoose");

//create schema to save New employee and admin Both Admin and Employee have a common schema and default is employee
const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    password: {
      type: "string",
      required: true,
    },
    role: {
      type: "string",
      enum: ["admin", "employee"],
      default: "employee",
    },
    assignedReviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AssignedReviews",
      },
    ],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Reviews",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
