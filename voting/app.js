const express = require("express");
const bodyParser = require("body-parser");
const reddis = require("./redis.js");
const methodOverride = require("method-override");
const session = require("express-session");

const app = express();

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//method override
app.use(methodOverride("_method"));

//session
app.use(session({
    cookie : { maxAge : 7 * 24 * 60 * 60 * 1000 },
    secret : '123jbbibin3khibi',
    name   : 'voterid',
    resave : false,
    saveUninitialized : true
  }));
//port
const PORT = process.env.PORT || 3000;



//view engine
app.set("view-engine", "ejs");

//routes
const routes = require("./routes/index.js")
app.use("/", routes);

app.listen(PORT, err => {
    if (err)
        console.log(err);
    else
        console.log("the app is running");
})