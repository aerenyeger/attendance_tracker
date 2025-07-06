const express=require("express")
const app=express();
const mongoose=require("mongoose")
const connectDB=require("./config/connectDB");
const Attendanceroutes = require("./routes/Attendanceroutes");
const dotenv=require("dotenv")
const cors=require("cors")
require("dotenv").config()
connectDB();
app.use(cors({
    origin:[
        "https://attendance-tracker-3uiu.onrender.com",
        "http://localhost:5173"
    ],
}))

app.use(express.json())
app.use("/api",Attendanceroutes)
app.listen(3000,(req,res)=>{
    console.log("connection successfull")
});