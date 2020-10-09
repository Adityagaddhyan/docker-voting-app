const express = require("express");
const mongoose = require("mongoose")
const app = express();
app.set("view-engine", "ejs");
const PORT = 3011;


//mongoose connection
mongoose.connect('mongodb://mongo:27017/voterapp', { useNewUrlParser: true, useUnifiedTopology: true });

//mongoose schema
const voteSchema = new mongoose.Schema({
    voter_id: String,
    voted: String
});
//moomgoose model
const Vote = mongoose.model("vote", voteSchema);    
app.get("/", (req, res, next) => {
    res.redirect("/result");
});
app.get("/result", (req, res, next) => {
    var dogcount;
    var catcount;
    Vote.count({ voted: "dogs" }, (err, count) => {
        console.log("dogs : ", count);
        dogcount = count;
    });
    Vote.count({ voted: "cats" }, (err, count) => {
        catcount = count;
        console.log("cats : ", count);
    });
    setTimeout((err) => {
        res.render("result.ejs", { dogcount: dogcount, catcount: catcount });
    }, 2000);

})


app.listen(PORT, err => {
    if (err) console.log(err);
    else console.log("Result app have started");
});