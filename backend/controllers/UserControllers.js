export const Testing=(req,res)=>{
    try {
        res.send({message: "hello world"})
    } catch (error) {
        console.log("error while testing",error)
        
    }
}


