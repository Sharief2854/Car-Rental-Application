const express = require("express");
const registerModel = require('../models/registerModel');
const router = express.Router();

router.post("/login", async function(req, res)
{
    var uEmail=  req.body.email; 
    var uPassword=  req.body.password; 
    
    let result  =  await registerModel.findOne({email: uEmail,password:uPassword}, {"_id":0}); 
    let flag=false;        
    console.log("[Read Single] - " + JSON.stringify(result));
    if(result)
    {
        flag=true;
        res.send(flag);
    }
    else
        res.send(result);
    
});

router.post('/register',  async  function (req,res)
{ 
        var uEmail=  req.body.email; 
        var registerObj  = new  registerModel({ 

            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:req.body.password,
            friendName:req.body.friendName,
            nickName:req.body.nickName,
            petName:req.body.friendName,
            schoolName:req.body.schoolName,
            }); 

        let flag  =  await registerModel.findOne({email:uEmail}, {"_id":0}); 
        var result = {};
        if(!flag)
        {
            let newObj  =  await  registerObj.save(); 
            result.status  = "Registered successfully";
            result.flag=true;
            console.log("[Create] - Record inserted in Database");
            res.send(result);           
        }
        else
        {
            result.flag=false;
            result.status  = "Email was already registered";
            res.send(result); 
        }
});

module.exports=router;