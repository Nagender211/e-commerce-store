import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const MONGO_URL=process.env.MONGO_URL

export const dbConnection=async()=>{
    try {
        await mongoose.connect(MONGO_URL,{},console.log("data base is connected"))
    } catch (error) {
        console.log("error while connecting the data base",error)
    }
}