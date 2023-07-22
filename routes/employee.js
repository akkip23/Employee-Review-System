const express = require("express");
const router = express.Router();
const employeeController = require("../controller/employee_controller");
const passport = require("passport");

router.get("/view-employee", passport.checkAuthentication, employeeController.viewEmployee);
router.delete("/destroy/:id", employeeController.destroy);
router.post("/save-user-review/:id/:reviewdFor", employeeController.saveReview);

module.exports = router; 