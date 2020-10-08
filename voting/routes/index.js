const express=require("express");
const bodyParser=require("body-parser");
const redis=require("redis");
const methodOverride=require("method-override");

const router=express.Router();


//body parser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));

//redis
const redisoption = {
    host: '0.0.0.0',
    port: 6379
};
const client = redis.createClient(redisoption);

//method override
router.use(methodOverride("_method"));


router.get("/",(req,res,next)=>{
    console.log("redirecting to vote page");
    res.redirect("/vote");
});
router.get("/vote",(req,res,next)=>{
    console.log("Rendering vote page");
    console.log(req.sessionID)
    res.render("voting.ejs",{animal:null});
});
router.get("/vote/dogs",(req,res,next)=>{
    res.render("voting.ejs",{animal:"dog"});
});
router.get("/vote/cats",(req,res,next)=>{
    res.render("voting.ejs",{animal:"cat"});
});
router.post("/vote/dogs",(req,res,next)=>{
    client.hset("vote",req.sessionID,"dogs");
    res.redirect("/vote/dogs");
    
})  
router.post("/vote/cats",(req,res,next)=>{
    client.hset("vote",req.sessionID,"cats");
    console.log("voted for cat");
    res.redirect("/vote/cats");

})  
module.exports=router;