const express = require("express");
const rideHistoryModel = require("../models/ride-history-model");
const router = express.Router();


router.post("/register",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await userHistoryModel.find({email:email},{"_id":0});
    res.send(obj.result);
})


module.exports=router;