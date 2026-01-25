import { verifyCookie } from "../utiles/authCookie.js";


export const requireProtected=(req, res, next)=>{

    try {
        const token=req.cookies?.token;
        console.log("token is",token)
        if(!token){
            return res.status(401).json({
                message: 'Not authinticated'
            })
        }
        const decoded=verifyCookie(token)
        req.user=decoded;
        next();
    } catch (error) {
        console.log("error while we require proteded",error)
        return res.status(501).json({
            message: "something went worng please try again"
        })
    }
}