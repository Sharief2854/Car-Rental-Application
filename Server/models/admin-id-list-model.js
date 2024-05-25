var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project');
var schema=mongoose.Schema; 
var adminsIdSchema=new schema(
    {
        Id:String,
        email:String       
    }
);
var adminsIdModel=mongoose.model('admins-id-list',adminsIdSchema);
module.exports=adminsIdModel;