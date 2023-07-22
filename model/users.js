const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    role: {
    type: "string", 
    enum: ['admin', 'employee'],
    default: 'employee',
  }, 
  assignedReviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "AssignedReviews"
  }],
  reviews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reviews"
  }],
},{
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;

