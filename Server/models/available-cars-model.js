var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project');
var schema=mongoose.Schema; 
var availableCarsSchema=new schema(
    {
        brand:String,
        model:String,
        price:String,
        car:String,
        totalprice:String,
        tax:String,
        discount:String
    },{versionkey:false}
);
var availableCarsModel=mongoose.model('available-cars',availableCarsSchema);
module.exports=availableCarsModel;