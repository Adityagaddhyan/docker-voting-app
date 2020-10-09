const express = require("express");
const bodyParser = require("body-parser");
const redis = require("redis");
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
//redis
const redisoption = {
    host: redis,
    port: 6379
};
const client = redis.createClient(redisoption);
client.on("error", function(error) {
    console.error(error);
  });


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