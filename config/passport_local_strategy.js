//require passport
const passport = require("passport");
//strategy to used for use authentication
const LocalStrategy = require("passport-local").Strategy;
//require user schema from model
const User = require("../model/users");

//using passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    //getting the user who is trying to login in and if valid creating session for him
    async function (email, password, done) {
      await User.findOne({ email: email })
        .then((user) => {
          if (!user || user.password != password) {
            console.log("invalid username/password");
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => {
          console.log("error in logging in user", err);
          return done(err);
        });
    }
  )
);

//when user is Authenticated user id is stored in the cookie of the browser in a serialize form
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserialize th user id on every req from the browser to the server as browser is stateless
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      return done(null, user);
    })
    .catch((err) => {
      console.log("error finding user for passport", err);
    });
});

//check if the user is authenticated used as a middleware
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/users/login");
};

//if the user is Authenticated set the user in res.locals
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
