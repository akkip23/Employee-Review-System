const User = require("../model/users");

module.exports.home = async function (req, res) {
    try {
        await User.findById(req.user.id)
        .populate({path: "assignedReviews"})
        .populate({path: "reviews"})
        .then((user) => {
            return res.render("home", {
                title: "home",
                userData: user 
            })
        })
    } catch (error) {
        console.log('error finding users', error);
    }      
}