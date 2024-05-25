const express = require("express");
const router = express.Router();
var nm=require('nodemailer');
let savedOtp={};
var transport=nm.createTransport(
    {
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{
            user:'shariefkadapa2854@gmail.com',
            pass:'ieku jkob svhh ecwe'
        }
    }
)
router.post('/sendOtp',(req,res)=>
{
    let email=req.body.email;
    let digits='0123456789';
    let limit=4;
    let otp='';
    for(i=0;i<limit;i++)
    {
        otp+=digits[Math.floor(Math.random()*10)];
    }
    var options={
        from:'shariefkadapa2854@gmail.com',
        to:`${email}`,
        subject:"Forget Password--Crazy Car Rental",
        html:`<p>Your One Time Password:${otp}</p>`

    }
    transport.sendMail(options,function(error,info)
    {
        let obj={};
        obj.flag=false;
        if(error)
        {
            console.log(error);
            obj.result="Couldn't send OTP..Retry!!!";
            res.status(500).send(obj);
        }
        else{
            savedOtp.otp=otp;
            obj.flag=true;
            obj.result="OTP has been sent your mail";
            // savedOtps.otp=otp;
            // setTimeout(()=>
            // {
            //     delete savedOtps.otp;
            // },600000)
            res.send(obj);
        }
    })
})
router.post('/verifyOtp',(req,res)=>
{
    let recievedOtp=req.body.otp;
    let obj={};
    
    // let email=req.body.email;
    console.log(recievedOtp);
    console.log(savedOtp.otp);

    if(savedOtp.otp==recievedOtp)
    {
        obj.result="Valid";
        obj.flag=true;
        res.send(obj);
    }
    else{
        obj.result="InValid";
        obj.flag=false;
        res.send(obj);
    }
})

module.exports=router;