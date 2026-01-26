import mongoose from 'mongoose'
const kycShecma=mongoose.Schema({
    pancard: {
        type: [String],
        required: true
    },
    holderphoto: {
        type: [String],
        required: true
    },

    holdername: {
        type: String,
        required: true,
        trim: true
    },
    bankname: {
        type: String,
        required: true
    },
    accountnumber: {
        type: Number,
        required: true
    },
    ifsc: {
        type: String,
        required: true,
    },
    accounttype: {
        type: String,
        enum: ["saving","bussines","zero account"],
        required: true
    },
    approved: {
        type: Boolean,
        default: false
    },
    userId: { // ✅ link kyc to user
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },


},{timeStamps: true});
export default mongoose.model("Kyc",kycShecma)