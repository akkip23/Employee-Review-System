const User = require("../model/users");
const AssignedReviews = require("../model/assignedReviews");

//controller action to redirect to page for Assign task and assigning new admin as employee
module.exports.assignTask = async function (req, res) {
  try {
    //get all user data
    await User.find({}).then((user) => {
      return res.render("assign_task", {
        title: "Assign Reviews",
        userData: user,
      });
    });
  } catch (error) {
    console.log("error finding users", error);
  }
};

//controller action to assign task to the employess
module.exports.assignTaskToUser = async function (req, res) {
  console.log(req.body, req.user.email);
  try {
    const user = await User.findOne({ email: req.body.assignTo });
    //create a new assigned review and save to the DB
    await AssignedReviews.create({
      reviewedFor: req.body.reviewer,
      reviewedBy: req.body.assignTo,
      assignedBy: req.user.email,
    }).then((assignedReview) => {
      user.assignedReviews.push(assignedReview);
      user.save();
      //flash messages to be shown on screen
      req.flash("success", "Task review has been assigned successfully");
      return res.redirect("back");
    });
  } catch (error) {
    console.log("error creating assigned task for review", error);
  }
};
