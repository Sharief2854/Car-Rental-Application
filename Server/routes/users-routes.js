const express = require("express");
const usersModel = require("../models/users-model");
const router = express.Router();

router.post("/getdata",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await usersModel.find({email:email});
    res.send(obj.result)
})
router.put("/updateProfile",  async function (req,res)
{
        let obj={};
        // obj._id=req.body._id;
        obj.name=req.body.name;
        obj.password= req.body.password;
        obj.email=req.body.email;
        let resResult  = await  usersModel.findOneAndUpdate(  {email:obj.email},   {  $set :obj});
        var result = {};

        if(resResult)
        {
            result.flag=true;
            result.status  = "Successfullll....!!";
            console.log("Record updated in Database");
            res.send(result);	
        }
        else{
            result.flag=false;
            result.status="Unsuccessfullll.....!!!"
            res.send(result);
        }
		
});
router.post("/getCoins",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await usersModel.find({email:email});
    res.send(obj.result)
})
router.post("/login", async function(req, res)
{
    var email=req.body.email;
    var password=req.body.password;
    let result  =  await usersModel.findOne({email:email,password:password},{"_id":0}); 
    let flag=false;        
    console.log("[Read Single] - " + JSON.stringify(result));
    if(result)
    {
        flag=true;
        res.send(flag);
    }
    else
        res.send(flag);
})
router.post("/verifyEmail", async function(req, res)
{
    var email=req.body.email;
    let result  =  await usersModel.findOne({email:email},{"_id":0}); 
    let flag=false;        
    console.log("[Read Single] - " + JSON.stringify(result));
    if(result)
    {
        flag=true;
        res.send(flag);
    }
    else
        res.send(flag);
})

router.put("/reset",  async function (req,res)
{ 
      
        let password= req.body.password;
        let email=req.body.email;
        
        console.log(email,password);
        let resResult  = await  usersModel.findOneAndUpdate(  {email:email},   {  $set :{password:password}});
        var result = {};

        if(resResult)
        {
            result.flag=true;
            result.status  = "Successfullll....!!";
            console.log("Record updated in Database");
            res.send(result);	
        }
        else{
            result.flag=false;
            result.status="Unsuccessfullll.....!!!"
            res.send(result);
        }
		
});

router.put("/updateCoins",  async function (req,res)
{ 
        let email=req.body.email;
        let coins=req.body.coins;
        let obj=await usersModel.findOne({email:email});
        let previousCoins=obj.coins;
        console.log(previousCoins);
        let resResult  = await  usersModel.findOneAndUpdate(  {email:email},   {  $set :{coins:previousCoins+coins}});
        var result = {};

        if(resResult)
        {
            result.flag=true;
            result.status  = "Successfullll....!!";
            console.log("Record updated in Database");
            res.send(result);	
        }
        else{
            result.flag=false;
            result.status="Unsuccessfullll.....!!!"
            res.send(result);
        }
		
});

router.post('/register',  async  function (req,res)
{ 
        var obj=new usersModel({ 
            name : req.body.name,
            email   : req.body.email,  
            password : req.body.password });

        let response =  await  obj.save(); 
		let result={};
        if(response)
        {
            result.flag=true;
            result.status  = "successful";
            console.log("[Create] - Record inserted in Database");
            res.send(result);  
        }
        else
        {
            result.flag=false;
            result.status  = "unsuccessfull";
            res.send(result);  
        }
		
		         
});


module.exports=router;