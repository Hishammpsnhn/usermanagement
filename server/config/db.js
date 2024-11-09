import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
const connectDb =async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            UseUnifiedTopology: true
        })
        console.log(`mongodb connected ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
    }
}

export default connectDb