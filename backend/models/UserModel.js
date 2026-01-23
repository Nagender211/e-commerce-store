import mongoose from 'mongoose'
import validator from 'validator'
const userShcham=mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: "please enter a valid gmail id"
        }
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: Number
    },
    expiretime: {
        type: Date
    },
    optverified:{
        type: String
    },
    verified: {
        type: Boolean
    }
})
export default mongoose.model("User",userShcham)