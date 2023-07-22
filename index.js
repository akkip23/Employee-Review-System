const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const expressLayout = require("express-ejs-layouts");
const DB = require("./config/mongoose")
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport_local_strategy");
const MongoStore = require("connect-mongo");

// Parse URL-encoded bodies (usually sent by forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (usually sent by APIs)
app.use(bodyParser.json());
app.use(express.static('./assets'));
app.use(expressLayout);
app.set("layout extractScritps", true);
app.set("layout extractStyles", true);

app.use(session({
    name: 'erSystem', 
    secret: `blahSomething`,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false,
    store: MongoStore.create(
      {
        mongoUrl: "mongodb+srv://akshaypawle23:dudr6iPX5Br1sSfu@cluster0.jqnuedp.mongodb.net/",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
}));

app.use(passport.initialize())
app.use(passport.session()) 

app.use(passport.setAuthenticatedUser);

app.use("/", require("./routes/index"));

app.set("views", "./views");
app.set("view engine", "ejs");

app.listen(8000, (err) => {
    if (err) {
        console.log('error connecting to server');
        return
    }
    console.log('connected to server on port', 8000); 
})