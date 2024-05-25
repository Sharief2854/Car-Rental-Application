var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project');
var schema=mongoose.Schema; 
var rideHistorySchema=new schema(
    {
        email:String,
        brand:String,
        pickupDate:String,
        rentedDate:String,
        totalprice:String,
        rideStatus:Boolean
    },{versionkey:false}
);
var rideHistoryModel=mongoose.model('ride-histories',rideHistorySchema);
module.exports=rideHistoryModel;