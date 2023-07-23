const User = require("../model/users"); 
const Reviews = require("../model/reviews");
const AssignedReviews = require("../model/assignedReviews")

module.exports.viewEmployee = async function (req, res) {
    
    try {
        await User.find({}).then((user) => {
            return res.render("employee", {
                title: "employees",
                userData: user 
            })
        })
    } catch (error) {
        console.log('error finding users', error);
    }  
}

module.exports.addNewEmployee = function (req, res) {
    return res.render("add_newEmployee", {
        title: "Add Employee"
    })    
}

module.exports.destroy = async function (req, res) {
    await User.findById(req.params.id).then(async (user) => {
        console.log(user);        

        try {
            await Reviews.deleteMany({_id: {$in: user.reviews}})
            await AssignedReviews.deleteMany({_id: {$in: user.assignedReviews}})
            await user.deleteOne({_id: user._id});
                req.flash("success", "Employee Deleted Successfully")
            return res.redirect("back")
        } catch (error) {
            console.log("error deleting user", error);
        }
      
       
    }).catch((error) => {
        console.log("error deleting employee", error);
    })
}

module.exports.saveReview = async function (req, res) {
    console.log(req.body);
    try {
        const user = await User.findOne({email: req.params.reviewdFor})
        await Reviews.create({
            review: req.body.reviewText,
            reviewedFor: "test",
            reviewedForEmail: req.params.reviewdFor,
            reviewedBy: req.user.name,
            reviewedByEmail: req.user.email,
        }).then(async (review) => {
            user.reviews.push(review)
            user.save()

            await AssignedReviews.findByIdAndDelete(req.params.id).then(async () => {
                await User.findByIdAndUpdate(req.user.id, {$pull: {assignedReviews: req.params.id}}).then(() => {

                    req.flash("success", "your review has been sent successfully")
                    if (req.xhr) {
                        return res.status(200).json({
                            data: {
                                isreviewed: true
                            },
                            message: "review has been saved successfully" 
                        })
                    }
                })
            })            
        })
        
    } catch (error) {
        console.log("error saving review", error);
    }
}

module.exports.updateReview = async function (req, res) {

    try {
        await Reviews.findByIdAndUpdate(req.params.id, {review: req.params.review}).then(() => {            
            
            if (req.xhr) {
                return res.status(200).json({                    
                    message: "review has been updated successfully" 
                })
            }
        })
    } catch (error) {
        
    }
}

module.exports.deleteReview = async function (req, res) {
    try {
        await Reviews.findByIdAndDelete(req.params.id).then( async () => {

            await User.findOneAndUpdate({email: req.params.email}, {$pull: {reviews: req.params.id}}).then(() => {
                if (req.xhr) {

                return res.status(200).json({                    
                    message: "review has been Deleted successfully" 
                })
            }
            })            
        })
    } catch (error) {
        
    }
}