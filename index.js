let express = require("express");
let cors = require("cors");
const Connections = require("./Config/db");
const bookRoutes = require("./Routes/book.routes");
require("dotenv").config();

let app = express();

app.use(cors());
app.use(express.json());


app.use("/api/book", bookRoutes)


app.listen(process.env.PORT, async () => {
    try {
      await Connections;
      console.log("<<<<<<<<<<<<<<<<<< DataBase Connection successfully >>>>>>>>>>>>");
      console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
      console.error("Database connection failed:", error.message);
    }
  });
  
