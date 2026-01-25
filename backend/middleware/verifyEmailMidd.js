import User from "../models/UserModel.js";


export const verifyEmailProtected=async(req,res,next)=>{
    try {
        const userId=req.user?.id;

        if(!userId){
            return res.status(401).json({
                message: "User is not found please login or register"
            })
        }
        const user=await User.findById(userId);
        if(!user.verified){
             return res.status(401).json({
                message: "email verification is not yet done"
            })
        }
        next()
    } catch (error) {
        console.log("error during the email verication proted route",error)
        return res.status(501).json({
            message: "501 bad gate way"
        })
    }
}