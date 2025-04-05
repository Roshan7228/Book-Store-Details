let mongoose=require("mongoose");
require("dotenv").config();

let Connections=mongoose.connect(process.env.Database_Url);


module.exports=Connections
