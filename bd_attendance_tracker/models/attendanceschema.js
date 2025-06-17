const mongoose=require("mongoose")

const subjectschema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    present:{
        type:Number,
        default:0
    },
    totalClasses:{
        type:Number,
        default:0
    }
})

const attendanceSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    subjects:[subjectschema]
})

const Attendance=mongoose.model("Attendance",attendanceSchema)//(name,schema)
module.exports=Attendance