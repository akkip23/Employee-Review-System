//require .env package to access in the whole project
const dotenv = require("dotenv").config({ path: "./config.env" });
//include expressjs to use all functionalities of express
const express = require("express");
//parse data which is send to controller in req.body
const bodyParser = require("body-parser");
const app = express();
//port on which the app will run
const port = process.env.PORT;
//express-ejs-layout used to include partial code
const expressLayout = require("express-ejs-layouts");
const DB = require("./config/mongoose");
//flash messages
const flash = require("connect-flash");
//middleware file for flash messages
const customeMware = require("./config/middleware");
const session = require("express-session");

//include passport
const passport = require("passport");
//strategy for passport to authenticate user (local strategy is used)
const passportLocal = require("./config/passport_local_strategy");

//databse connection file
const MongoStore = require("connect-mongo");

// Parse URL-encoded bodies (usually sent by forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (usually sent by APIs)
app.use(bodyParser.json());

//folder from which static files will be accessed
app.use(express.static(`${process.env.ASSETS_PATH}`));

//use express layout and extractScritps, extractStyles to be used in layout.ejs for partials
app.use(expressLayout);
app.set("layout extractScritps", true);
app.set("layout extractStyles", true);

//create session and store session data in database
app.use(
  session({
    name: "erSystem",
    secret: `${process.env.SESSION_SECREAT}`,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: false,
    store: MongoStore.create(
      {
        mongoUrl: process.env.DB,
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

//initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());

//set Authenticated user
app.use(passport.setAuthenticatedUser);

//require flash messages and it's middleware
app.use(flash());
app.use(customeMware.setFlash);

//all incoming request will be send to ./routes/index
app.use("/", require("./routes/index"));

//folder to access views
app.set("views", "./views");

//assign a template to view engine to use javascript/jquery dynamically in html code (using EJS)
app.set("view engine", "ejs");

//server to listen and run on port
app.listen(port, (err) => {
  if (err) {
    console.log("error connecting to server");
    return;
  }
  console.log("connected to server on port", 8000);
});
