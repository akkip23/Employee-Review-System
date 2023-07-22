const mongoose = require("mongoose");

let DB = "mongodb+srv://akshaypawle23:dudr6iPX5Br1sSfu@cluster0.jqnuedp.mongodb.net/"

mongoose.connect(DB).then(() => {
    console.log("connection successfull to database");
}).catch(() => {
    console.log("error connecting to server");
})

module.exports = DB;