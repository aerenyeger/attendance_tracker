const mongoose=require("mongoose")
const express=require("express")
const router=express.Router()
const{check_login,check_signup,attendance_info,add_present,add_absent,delete_subject,add_subject} =require("../controllers/Attendance")
router.post("/check_login",check_login)

router.post("/check_signup",check_signup)

router.post("/attendance_info",attendance_info)

router.post("/add_present",add_present)

router.post("/add_absent",add_absent)

router.post("/delete_subject",delete_subject)

router.post("/add_subject",add_subject)
module.exports=router