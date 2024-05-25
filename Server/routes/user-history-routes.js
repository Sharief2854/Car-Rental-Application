const express = require("express");
const userHistoryModel = require("../models/user-history-model");
const router = express.Router();

router.get("/getdata",async function(req,res)
{
    let obj={};
    obj.result=await userHistoryModel.find({},{});
    res.send(obj.result)
})
router.post("/getUserHistory",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await userHistoryModel.find({email:email},{});
    res.send(obj.result);
})
router.post("/getUserPrice",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await userHistoryModel.find({email:email,isRideCompleted:true,coinsUpdated:false},{"_id":0,"totalPriceAfterRented":1});
    
    if(obj.result)
        await userHistoryModel.updateMany( {email:email,isRideCompleted:true,coinsUpdated:false},{$set:{coinsUpdated:true}});

    res.send(obj.result);
})

router.post("/getUserKm",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await userHistoryModel.find({email:email,isRideCompleted:true,coinsUpdated:false},{"_id":0,"initialKm":1,"finalKm":1});
    
    if(obj.result)
    {
        obj.flag=true;
        res.send(obj);

    }
    else{
        obj.flag=false;
        res.send(obj);
    }
})

router.post("/coinsUpdated",async function(req,res)
{
    let email=req.body.email;
    let obj={};
    obj.result=await userHistoryModel.updateMany( {email:email,isRideCompleted:true},{$set:{coinsUpdated:true}});
    let flag=false;
    if(obj.result)
    {
        flag=true;
    }
    
    res.send(flag);
})
router.put('/update',  async function (req,res)
{ 
    let _id=req.body._id;

    var obj={ 
        email:req.body.email,
        brand : req.body.brand,
        model   : req.body.model,  
        date:req.body.date,
        todate:req.body.todate,
        totalprice : req.body.totalprice,
        status:req.body.status,
        message:req.body.message,
        pending:req.body.pending   

    };
        

        let resResult  = await  userHistoryModel.findOneAndUpdate(  {_id:_id},   {  $set : obj});
 
		var result = {};
		result.status  = "Record updated in Database";
		console.log("[Update] - Record updated in Database");
		res.send(result);	
});

router.post('/add',  async  function (req,res)
{ 
        var obj=new userHistoryModel({ 
            email:req.body.email,
            brand : req.body.brand,
            model   : req.body.model,  
            date:req.body.date,
            todate:req.body.todate,
            totalprice : req.body.totalprice,
            status:false,
            message:"New Booking--Pending",
            pending:true,
            coinsUpdated:false
        });

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

router.put("/addPickupDetails",async function(req,res)
{
    let _id=req.body._id;
    var obj={ 
        pickupDate:req.body.pickupDate,
        initialKm:req.body.initialKm,
        pickup:true,
        message:"Car Picked"
    };
    obj.result=await userHistoryModel.findOneAndUpdate({_id:_id},{$set : obj});
    res.send(obj.result);
})
router.put("/addReturnDetails",async function(req,res)
{
    let _id=req.body._id;
    var obj={ 
        returnDate:req.body.returnDate,
        finalKm:req.body.finalKm,
        isRideCompleted:true,
        message:"Ride completed",
        totalPriceAfterRented:req.body.totalPriceAfterRented

    };
    obj.result=await userHistoryModel.findOneAndUpdate({_id:_id},{$set : obj});
    res.send(obj.result);
})

module.exports=router;