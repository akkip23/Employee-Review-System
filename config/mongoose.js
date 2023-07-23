const mongoose = require("mongoose");

let DB = process.env.DB;

mongoose.connect(DB).then(() => {
    console.log("connection successfull to database");
}).catch(() => {
    console.log("error connecting to server");
})

module.exports = DB;