var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project');
var schema=mongoose.Schema; 
var userHistorySchema=new schema(
    {
        email:String,
        brand:String,
        model:String,
        date:String,
        todate:String,
        totalprice:String,
        status:Boolean,
        message:String,
        pending:Boolean,
        isRideCompleted:Boolean,
        pickupDate:String,
        returnDate:String,
        initialKm:String,
        finalKm:String,
        totalPriceAfterRented:String,
        pickup:Boolean,
        coinsUpdated:Boolean
    },{versionkey:false}
);
var userHistoryModel=mongoose.model('user-histories',userHistorySchema);
module.exports=userHistoryModel;