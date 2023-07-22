const express = require("express");
const router = express.Router();
const homeController = require("../controller/home_controller");
const passport = require("passport");

router.get("/", passport.checkAuthentication, homeController.home);

router.use("/users", require("./users"));
router.use("/admin", require("./admin"));
router.use("/employee", require("./employee"));

module.exports = router;