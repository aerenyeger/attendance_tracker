const express=require("express")
const app=express();
const mongoose=require("mongoose")
const connectDB=require("./config/connectDB");
const Attendanceroutes = require("./routes/Attendanceroutes");
const dotenv=require("dotenv")
require("dotenv").config()
app.listen(3000,(req,res)=>{
    console.log("connection successfull")
});
app.use(express.json())
app.use("/api",Attendanceroutes)
connectDB();