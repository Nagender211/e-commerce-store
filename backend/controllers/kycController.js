import Kyc from "../models/KycModel.js"

export const createKyc=async(req,res)=>{
    const {holdername,bankname,accountnumber,ifsc,accounttype}=req.body;
    if(!holdername || !bankname || !accountnumber || !ifsc || !accounttype){
        return res.status(200).json({
            message: "please enter the all the fields"
        })
    }
    const pancard = (req.files?.pancard  || []).map((file) => `/kycuploads/${file.filename}`);
    const holderphoto=(req.files?.holderphoto || []).map((file)=> `kycuploads/${file.filename}`)
    const kyc=await Kyc.create({userId: req.user.id,holdername,bankname,accountnumber,ifsc,accounttype,pancard,holderphoto});
    res.status(200).json({
        message: "kyc is created, now you enjoy by posting the product that thank",
        data: kyc
    })
}