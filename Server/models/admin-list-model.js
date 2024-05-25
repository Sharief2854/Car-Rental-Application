var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project');
var schema=mongoose.Schema; 
var adminsListSchema=new schema(
    { 
        name:String,
        email:String,
        password:String
    },
    {versionkey:false}
);
var adminsListModel=mongoose.model('admins-lists',adminsListSchema);
module.exports=adminsListModel;