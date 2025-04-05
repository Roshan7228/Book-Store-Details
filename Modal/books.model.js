let mongoose=require("mongoose");


let bookSchema=new mongoose.Schema({
    Title:{
        type:String,
        required:true
    },
    Author:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    ISBN:{
        type:String,
        default:"12345678910"
    }
},
{
    versionKey: false,
    timestamps: true,
})

let BookModel=mongoose.model("BookDetails",bookSchema);

module.exports=BookModel