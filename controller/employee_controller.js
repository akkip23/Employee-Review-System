const User = require("../model/users"); 
const Reviews = require("../model/reviews");

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

module.exports.destroy = async function (req, res) {
    await User.findByIdAndDelete({id: req.query.id}).then(() => {
        // req.flash("success", "Employee Deleted Successfully")
        return res.redirect("back")
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
        }).then((review) => {
            user.reviews.push(review)
            user.save()
            // req.flash("success", "your review has been sent successfully")
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        isreviewed: true
                    },
                    message: "review has been saved successfully" 
                })
            }
        })
        
    } catch (error) {
        console.log("error saving review", error);
    }
}