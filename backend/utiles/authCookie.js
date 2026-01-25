import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();



export const sendCookie=(payload)=>{
    return jwt.sign(payload,process.env.jwt_token,{expiresIn: process.env.JWT_EXPIRE})
}

export const verifyCookie=(token)=>{
    return jwt.verify(token,process.env.jwt_token)
}