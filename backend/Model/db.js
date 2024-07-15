const mongoose = require("mongoose");
require('dotenv').config();
const DB_URL=process.env.DB_URL;

mongoose.connect(DB_URL).then(()=>{
  console.log("MongoDB is connected");
}).catch((err)=>{
  console.log("Error in conncecting with MongoDB: ",err);
});