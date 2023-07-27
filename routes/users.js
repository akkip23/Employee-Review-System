//include express files
const express = require("express");
//router to route the request
const router = express.Router();
//include Users controller to push request to controller
const userController = require("../controller/users_controller");
const passport = require("passport");

//redirect to login and sign pages
router.get("/login", userController.signIn);
router.get("/SignUp", userController.signUp);

//get users login and sign up data and send to controller
router.post("/createAccount", userController.CreateAccount);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/login" }),
  userController.createSession
);

//update users role to admin
router.post("/update-UserRole", userController.updateUserRole);

//get full user details for view employee
router.get("/getUsersDetails/:id", userController.getUserDetails);

router.get("/sign-out", userController.destroySession);

module.exports = router;
