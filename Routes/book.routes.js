let express =require("express");
const { getallbook, createbook, updatebook, deletebook, description } = require("../Controller/book.controller");

let bookRoutes=express.Router();

bookRoutes.get("/getallbook",getallbook);
bookRoutes.post("/createbook",createbook);
bookRoutes.patch("/updatebook/:bookid",updatebook);
bookRoutes.delete("/deletebook/:bookid",deletebook);
bookRoutes.get("/description/:bookid",description)



module.exports=bookRoutes;