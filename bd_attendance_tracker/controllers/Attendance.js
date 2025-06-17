const Attendance=require("../models/attendanceschema")

exports.check_login=async(req,res)=>{
    try {
        const username=req.body.username;
    const password=req.body.password;
    const user=await Attendance.findOne({username:username,password:password})
    if(user){
        return res.status(200).json(user)
    }
    return res.status(400).json({message:"user not found"})
        
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: "Internal server error" });
    }
}

exports.check_signup=async(req,res)=>{
    try {
        const username=req.body.username;
    const password=req.body.password;
    const exist=await Attendance.findOne({username:username})
    if(exist){
        return res.status(400).json({message:"user already exist with this name "})
    }
    else{
        const attendance=new Attendance({
            username:username,
            password:password
        })
        await attendance.save()
        return res.status(200).json({message:"entry saved successfully"})
    }
    } catch (error) {
        console.log("error while saving")
        console.log(error.message)
    }
}

exports.attendance_info=async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const attend=await Attendance.findOne({username:username,password:password})
    return res.status(200).json(attend);
}

exports.add_present=async(req,res)=>{
    try {
        console.log("req received")
        const subj=req.body.subject;
    const _id=req.body._id;
    const attend=await Attendance.findById(_id)
    const toadd=attend.subjects.find(s=>s.subject===subj)
    toadd.present+=1;
    toadd.totalClasses+=1;
    await attend.save();
    return res.status(200).json({message:"successfully updated"})
    } catch (error) {
        console.log("req received")
        console.log(error.message)
    }
}

exports.add_absent=async(req,res)=>{
    console.log("req received")
    const subj=req.body.subject;
    const _id=req.body._id;
    const attend=await Attendance.findById(_id)
    const toadd=attend.subjects.find(s=>s.subject===subj)//we cant use{} or if we want to use return is required
    toadd.totalClasses+=1;
    await attend.save();
    return res.status(200).json({message:"successfully updated"})
}


exports.delete_subject=async(req,res)=>{
    try {
        const _id=req.body._id;
    const subject=req.body.subject
    const update=await Attendance.findByIdAndUpdate({_id:_id},{
        $pull:{
            subjects:{
                subject:subject
            }
        }
    },{new:true})
    if(update){
        return res.status(200).json({message:"successfully updated"})
    }    
    return res.status(400)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({message:"internal server error"})
    }
}

exports.add_subject=async(req,res)=>{
    try {
        const _id=req.body._id;
    const subject=req.body.subject
    console.log(_id)
    const subj=await Attendance.findById({_id:_id})
    const array_to_update=subj.subjects;
    array_to_update.push({subject:subject,present:0,totalClasses:0})
    await subj.save()
    console.log("successfully saved")
    return res.status(200).json({message:"successfully saved"})

    } catch (error) {
        console.log("error")
        console.log(error.message)
        return res.status(500).json({message:"error while adding the subject in the database"})
        
    }
}
