import mongoose from "mongoose"

let connectDb = async()=>{
    try {
        let conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`db Connection Success ${conn.connection.name}`);
    } catch (error) {
        console.log("DB connection failed");
        
        
    }
    
}

export default connectDb