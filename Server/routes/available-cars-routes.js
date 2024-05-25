const express = require("express");
const availableCarsModel = require('../models/available-cars-model');
const router = express.Router();

router.get("/allCars", async function(req, res)
{
    let obj={};
    obj.result=await availableCarsModel.find({},{"_id":0});
    res.send(obj.result);
})
router.post('/addCar',  async  function (req,res)
{ 
        var obj=new availableCarsModel({ 
            brand : req.body.brand,
            model   : req.body.model,  
            price : req.body.price, 
            car : req.body.car,
            tax : req.body.tax,
            totalprice : req.body.totalprice,
            discount:req.body.discount

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

router.post('/deleteCar',async function (req,res)
{  
    var model =req.body.model;
    let resResult  =  await  availableCarsModel.findOneAndDelete({model:model}); 
    
    console.log(resResult);
	var result = {};
	result.status  = "Record deleted from Database";
	console.log("[Delete] - Record deleted from Database");
	res.send(result);
       
});
router.put('/updateCar',  async function (req,res)
{ 
    let model   = req.body.model;
    var obj={ 
        brand : req.body.brand,
        model   : req.body.model,  
        price : req.body.price, 
        car : req.body.car,
        tax : req.body.tax,
        totalprice : req.body.totalprice,
        discount:req.body.discount

    };
        

        let resResult  = await  availableCarsModel.findOneAndUpdate(  {model:model},   {  $set : obj});
 
		var result = {};
		result.status  = "Record updated in Database";
		console.log("[Update] - Record updated in Database");
		res.send(result);	
});

module.exports=router;