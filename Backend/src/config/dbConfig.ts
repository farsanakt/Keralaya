import mongoose from "mongoose";
import  dotenv from 'dotenv'

dotenv.config()

const connectMongoDb=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL!)
        console.log('db connected')
    } catch (error) {
        console.log('error connecting in db')
    }
}

export default connectMongoDb