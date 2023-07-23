//require .env package to access in the whole project
const dotenv = require("dotenv").config({path: "./config.env"}) 
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT;
const expressLayout = require("express-ejs-layouts");
const DB = require("./config/mongoose")
const flash = require("connect-flash");
const customeMware = require("./config/middleware");
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo");

// Parse URL-encoded bodies (usually sent by forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (usually sent by APIs)
app.use(bodyParser.json());
app.use(express.static(`${process.env.ASSETS_PATH}`));
app.use(expressLayout);
app.set("layout extractScritps", true);
app.set("layout extractStyles", true);

app.use(session({
    name: 'erSystem', 
    secret: `${process.env.SESSION_SECREAT}`,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
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
}));

app.use(passport.initialize())
app.use(passport.session()) 

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customeMware.setFlash);

app.use("/", require("./routes/index"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(port, (err) => {
    if (err) {
        console.log('error connecting to server');
        return
    }
    console.log('connected to server on port', 8000); 
})