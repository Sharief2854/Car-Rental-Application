const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");  
const adminRoutes = require('./routes/admin-list-routes');
const availableCarsRoutes = require('./routes/available-cars-routes');
const forgetPasswordRoutes=require('./routes/forget-pass-routes');
const userRoutes=require('./routes/users-routes');
const userHistoryRoutes=require('./routes/user-history-routes');

var app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors('*'));

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/car", availableCarsRoutes);
app.use("/forgetPassword",forgetPasswordRoutes);
app.use("/userHistory",userHistoryRoutes);



app.get("/", function(req,res)
{
    res.send("Welcome to Express JS API Application");
});


var server=app.listen(3005,function() {});
console.log("Server Started. URL:http://localhost:3005");