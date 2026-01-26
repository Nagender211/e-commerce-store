import express from 'express'
import dotenv from 'dotenv'
import router from './routes/userRoute.js';
import { dbConnection } from './dbconnection/dbConnection.js';
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()
const app=express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/kycuploads", express.static(path.join(process.cwd(), "kycuploads")));

dbConnection()
app.use(router);
app.listen(process.env.PORT,()=>{
    console.log(`server is runnig in the port ${process.env.PORT}`)
})
