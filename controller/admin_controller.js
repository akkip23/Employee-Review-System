const User = require("../model/users");
const AssignedReviews = require("../model/assignedReviews");

module.exports.assignTask = async function (req, res) {
    try {
        await User.find({}).then((user) => {
            return res.render("assign_task", {
                title: "Assign Reviews",
                userData: user 
            })
        })
    } catch (error) {
        console.log('error finding users', error);
    }    
}

module.exports.assignTaskToUser = async function (req, res) {
    console.log(req.body, req.user.email);
    try {
        const user = await User.findOne({email: req.body.assignTo})
        await AssignedReviews.create({
            reviewedFor: req.body.reviewer,
            reviewedBy: req.body.assignTo,
            assignedBy: req.user.email
        }).then((assignedReview) => {
            user.assignedReviews.push(assignedReview);
            user.save();
            req.flash("success", "Task review has been assigned successfully") 
            return res.redirect("back")
        })
        
    } catch (error) {
        console.log("error creating assigned task for review", error);
    }
}