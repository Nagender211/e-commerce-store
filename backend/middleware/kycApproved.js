import Kyc from '../models/KycModel.js'
export const kycapproved=async(req,res,next)=>{
    try {
        const kyc = await Kyc.findById({ userId: req.user.id }); 
        console.log(kyc)
        if(!kyc){
            return res.status(401).json({
                message: "there is no kyc is found"
            })
        }
        if(!kyc.approved){
            return res.status(400).json({
                message: "your not yet verified"
            })
        }
        next()
    } catch (error) {
        console.log("error while aprroveing the kyc")
    }
}