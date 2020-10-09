const express = require("express");
const redis = require("redis");
const mongoose = require("mongoose");

//mongoose connection
mongoose.connect('mongodb://mongodb:27017/voterapp', { useNewUrlParser: true, useUnifiedTopology: true   });

const app = express();


//connecting to redis
const redisoption = {
    host: redis,
    port: 6379
};
const client = redis.createClient("6379");

//mongoose schema
const voteSchema = new mongoose.Schema({
    voter_id: String,
    voted: String
});
//moomgoose model
const Vote = mongoose.model("vote", voteSchema);


//get all changed data from redis and push into database

function intervalFunc(){
    client.hgetall("vote", (err, val) => {
    if (err)
        console.log(err);
    else {
        for (const [key, value] of Object.entries(val)) {
            Vote.findOne({ voter_id: key }, (err, result) => {
                console.log(key,value);
                if (err)
                    return console.log(err);
                if (!result) {
                    Vote.create({ voter_id: key, voted: value });
                }
                else if (result) {
                    Vote.findByIdAndUpdate({ voter_id: key }, { $set: { voted: value } });
                }
            })
        }
    }
})
}

setInterval(intervalFunc, 15000);