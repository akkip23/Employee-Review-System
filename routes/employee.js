//include express files
const express = require("express");
//router to route the request
const router = express.Router();
//include Employee controller to push request to controller
const employeeController = require("../controller/employee_controller");
const passport = require("passport");

//get HTTP request to view Employees
router.get(
  "/view-employee",
  passport.checkAuthentication,
  employeeController.viewEmployee
);

//get HTTP request add new employees
router.get(
  "/add-new-employee",
  passport.checkAuthentication,
  employeeController.addNewEmployee
);

//delete an employee
router.get("/destroy/:id", employeeController.destroy);
router.post("/save-user-review/:id/:reviewdFor", employeeController.saveReview);

//update review
router.post("/update-user-review/:id/:review", employeeController.updateReview);

//delete review
router.delete(
  "/delete-user-review/:id/:email",
  employeeController.deleteReview
);

module.exports = router;
