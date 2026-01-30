import Razorpay from 'razorpay'
import dotenv from 'dotenv'
import crypto from 'crypto'
dotenv.config()
export const createOrderInstace = async(req,res)=>{
    try {
        const instance=new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.SCREATE_KEY
        })
        const options={
            amount: req.body.amount*100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex")
        }
        instance.orders.create(options,(error,order)=>{
            if(error){
                console.log("error while creating the order",error)
                return res.status(500).json({
                    success: false,
                    message: "Failed to create order please login",
                    error: error.message
                })
            }
            res.status(200).json({
                success: true,
                data: order
            })
        })
    } catch (error) {
        console.log("error in catch",error)
        return res.status(500).json({
            success: false,
            message: "Server error while creating order",
            error: error.message
        })
    }
}


export const verifyPayment=async(req,res)=>{
    try {
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const sign=razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign=crypto.createHmac("sha256",process.env.SCREATE_KEY).update(sign.toString()).digest("hex");
        if(expectedSign !== razorpay_signature){
            return res.status(400).json({
                success: false,
                message: "Payment verification failed - signature mismatch"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Payment successfully verified"
        })
    } catch (error) {
        console.log("error on verification payment", error)
        return res.status(500).json({
            success: false,
            message: "Server error during payment verification",
            error: error.message
        })
    }
}