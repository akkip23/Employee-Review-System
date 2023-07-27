//include express files
const express = require("express");
//router to route the request
const router = express.Router();
//include Admin controller to push request to controller
const adminController = require("../controller/admin_controller");
const passport = require("passport");

//get HTTP request for Assigning task
router.get(
  "/assign-task",
  passport.checkAuthentication,
  adminController.assignTask
);

//post HTTP request for saving assigned review task
router.post(
  "/assignedReviewToEmployee",
  passport.checkAuthentication,
  adminController.assignTaskToUser
);

module.exports = router;
