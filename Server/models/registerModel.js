var mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/project');
var schema=mongoose.Schema; 
var registerSchema=new schema(
    {
        email:String,
        firstName:String,
        lastName:String,
        password:String,
        friendName:String,
        nickName:String,
        petName:String,
        schoolName:String
    }
);
var registerModel=mongoose.model('registered-users',registerSchema);
module.exports=registerModel;