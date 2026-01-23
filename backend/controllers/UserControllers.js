import User from '../models/UserModel.js'
export const Testing=(req,res)=>{
    try {
        res.send({message: "hello world"})
    } catch (error) {
        console.log("error while testing",error)
        
    }
}

export const Register = async(req,res)=>{
    try {
        const {username,email,password,confirmpassword}=req.body;
        if(!username || !email || !password || !confirmpassword){
            return res.status(404).json({
                message: "please enter the all the fields"
            })
        }
        if(password!==confirmpassword){
            return res.status(404).json({
                message: "please match the password"
            })
        }
        const exitinguser=await User.findOne({email})
        if(exitinguser){
            return res.status(409).json({
                message: "user is already exists"
            })
        }
        const user=await User.create({username,email,password,confirmpassword})
        res.status(201).json({
            message: "succesfully created user",
            data: user
        })
    } catch (error) {
        console.log("error while creating user",error)
        return res.status(501).json({
                message: "Something went worng please try again"
        })
        
    }
}

export const Login =async (req,res)=>{
    
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).json({
                message: "please enter the all the fields"
            })
        }
        const user=await User.findOne({email});
        if(!user){
          return res.status(404).json({
                message: "user is not found please register"
            })
        }
        if(user.password!==password){
            return res.status(404).json({
                message: "password is incrroct"
            })
        }
        res.status(200).json({
            message: "login is succefully",
            data: user
        })
    } catch (error) {
        console.log("error while login",error)
         return res.status(501).json({
                message: "Something went worng please try again"
        })
    }
}


