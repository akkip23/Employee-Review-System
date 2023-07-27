//include express files
const express = require("express");
//router to route the request
const router = express.Router();
//include Home controller to push request to controller
const homeController = require("../controller/home_controller");
const passport = require("passport");

//redirect to home page
router.get("/", passport.checkAuthentication, homeController.home);

//redirect request to users routes
router.use("/users", require("./users"));

//redirct request to admin routes
router.use("/admin", require("./admin"));

//redirect request to employee routes
router.use("/employee", require("./employee"));

module.exports = router;
