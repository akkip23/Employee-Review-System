const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/users");

passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    async function (email, password, done) {
        await User.findOne({email: email}).then((user) => {
            if (!user || user.password != password) {
                console.log('invalid username/password');
                return done(null, false)
            }
            return done(null, user)
        }).catch((err) => {
            console.log('error in logging in user', err);
            return done(err);
        })
    }
))

passport.serializeUser(function (user, done) {
    done(null, user.id)
})

passport.deserializeUser(function (id, done) {
    User.findById(id).then((user) => {
        return done(null, user)
    }).catch((err) => {
        console.log("error finding user for passport", err);
    })
})

passport.checkAuthentication = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    return res.redirect("/users/login")
}

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    return next()
}

module.exports = passport;
