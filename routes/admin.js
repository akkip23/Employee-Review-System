const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin_controller");
const passport = require("passport");

router.get("/assign-task", passport.checkAuthentication, adminController.assignTask);
router.post("/assignedReviewToEmployee", passport.checkAuthentication, adminController.assignTaskToUser)

module.exports = router;
