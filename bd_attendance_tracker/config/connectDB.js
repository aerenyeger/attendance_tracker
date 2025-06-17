const mongoose=require("mongoose")
const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://aggarwalmohit118:YN5UZoKURG7kc8hC@cluster.axncbuk.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,})
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports=connectDB