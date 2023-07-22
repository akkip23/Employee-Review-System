const User = require("../model/users");

//controller action to redirect to the login page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/")
    }
    return res.render("login", {
        layout: false,
        title: "Login"
    })
}

//controller action to redirect to the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect("/") 
    }
    return res.render("sign-up", {
        layout: false,
        title: "Sign up"
    })
}

//get the sign up data and save to dataBase 
module.exports.CreateAccount = async function (req, res) {
    try {
        const isUser = await User.exists({email: req.body.email})
        // console.log("req.body", isUser);
        if (isUser != null) {
            // req.flash("error", "Account Already Exist With this Email")
            res.status(200).json({ message: "Account Already Exist With this Email"})
            return res.redirect("back")
        }

        if (req.body.password == req.body.Cnfpassword) {
            await User.create(req.body).then((user) => {
                // req.flash("success", "Account Created Successfully")
                // console.log("created new user", user);
                res.redirect("/users/login")
            })            
        } else {
            // req.flash("error", "password and confirm password cannot be different")
            res.redirect("back")
        }
    } catch (error) {
        // res.status(200).
        console.log("error creating new user", error);
    }
}

module.exports.createSession = function (req, res) {
    res.redirect("/") 
}

module.exports.updateUserRole = async function (req, res) {
    try {
        if (req.user.role == "admin") {
            await User.findOneAndUpdate({email: req.body.selAdmin}, {role: "admin"}).then(() => {
                // req.flash("success", "New admin has been assigned successfully")
                return res.redirect("back")
            })

        } else {
            // req.flash("error", "Not Authorized")
            return res.redirect("/users/login")
        }
    } catch (error) {
        console.log("error assigning new admin", error);
    }
}

module.exports.getUserDetails = async function (req, res) {
    
    try {
        await User.findById(req.params.id)        
        .populate({path: "reviews"})
        .then((user) => {
            if (req.xhr) {
                return res.status(200).json({
                    data:{
                        userData: user
                    }                    
                })
            }
        })
    } catch (error) {
        console.log('error finding users', error);
    }      
}

module.exports.destroySession = function (req, res) {
    req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    // req.flash("success", "you have Logged out!");
    return res.redirect("/");
  });
}