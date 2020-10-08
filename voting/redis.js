const redis=require("redis");

var redisPORT =  6379;

const client = redis.createClient(redisPORT);

module.exports=client;
