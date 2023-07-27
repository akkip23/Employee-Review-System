//require mongoose to connect to DB
const mongoose = require("mongoose");

//mongoose connection url
let DB = process.env.DB;

mongoose
  .connect(DB)
  .then(() => {
    console.log("connection successfull to database");
  })
  .catch(() => {
    console.log("error connecting to server");
  });

module.exports = DB;
