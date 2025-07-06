const mongoose=require("mongoose")
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,})
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports=connectDB