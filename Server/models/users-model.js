var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project');
var schema=mongoose.Schema; 
var usersSchema=new schema(
    {
        name:String,
        email:String,
        password:String,
        coins:Number
    },
    {versionkey:false}
);
var usersModel=mongoose.model('users-lists',usersSchema);
module.exports=usersModel;