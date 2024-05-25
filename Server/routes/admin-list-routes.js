const express = require("express");
const adminsListModel= require('../models/admin-list-model');
const router = express.Router();

router.post("/getdata",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await adminsListModel.findOne({email:email});
    res.send(obj.result)
})
router.post("/login", async function(req, res)
{
    var aEmail=req.body.email;
    var aPass=req.body.password;
    let result  =  await adminsListModel.findOne({email:aEmail,password:aPass},{"_id":0}); 
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
    var aEmail=req.body.email;
    let result  =  await adminsListModel.findOne({email:aEmail},{"_id":0}); 
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
        let resResult  = await  adminsListModel.findOneAndUpdate(  {email:email},   {  $set :{password:password}});
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

router.put("/updateProfile",  async function (req,res)
{ 
        let obj={};
        // obj._id=req.body._id;
        obj.name=req.body.name;
        obj.password= req.body.password;
        obj.email=req.body.email;
        let resResult  = await  adminsListModel.findOneAndUpdate(  {email:obj.email},   {  $set :obj});
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
        var obj=new adminsListModel({ 
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