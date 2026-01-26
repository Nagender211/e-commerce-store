import Product from "../models/ProductModel.js";
import fs from 'path'


export const createProducts=async(req,res)=>{
    try {
        const {productname,productdiscription,productrating,productprice,productcategory}=req.body;
        if(!productname || !productdiscription || !productrating || !productprice || !productcategory){
            return res.status(400).json({
                message: "please enter all the fields"
            })
        }
        const images = (req.files || []).map((file) => `/uploads/${file.filename}`);
        const product=await Product.create({createdBy: req.user.id,productname,productdiscription,productrating,productprice,productcategory,images})
        res.status(201).json({
            message: "product is created",
            data: product
        })
    } catch (error) {
        console.log("error while creating the product",error)
    }
}

export const editProduct=async(req,res)=>{
    try {
        const {productname,productdiscription,productrating,productprice,productcategory}=req.body;
        const {id}=req.params;
        const images = (req.files || []).map((file) => `/uploads/${file.filename}`);
        const product=await Product.findByIdAndUpdate(id,{productname,productdiscription,productrating,productprice,productcategory,images},{new: true});
        await product.save()
        res.status(201).json({
            message: "product is edited succesfuly",
            data: product
        })
    } catch (error) {
        console.log("error while created edited",error)
    }
}


export const getAllPost=async(req,res)=>{
    try {
        const getallproducts=await Product.find();
        console.log(getAllPost)
        res.status(200).json({
            message: "all the products are fetched",
            data: getallproducts
        })
    } catch (error) {
        console.log("error while getting the all the products",error)
        return res.status(501).json({
            message: "Hey your gettignt the erorr bad reqest"
        })
    }
}



export const singelPost=async(req,res)=>{
    try {
        const {id}=req.params;
        const getSinglePost=await Product.findById(id)
        console.log("here is the inner post",getSinglePost)
        res.status(200).json({
            message: "your inner post",
            data: getSinglePost
        })
    } catch (error) {
        console.log("error while getting the single post",error);
        return res.status(501).json({
            message: "Hey your gettignt the erorr bad reqest"
        })
    }
}



export const getMyProducts=async(req,res)=>{
    try {
        const userId=req.user.id;
        const getallmyproducts=await Product.find({createdBy: userId});
        console.log("your products",getallmyproducts)
        console.log("your products length",getallmyproducts.length)
        res.status(200).json({
            message: "your all products",
            data: getallmyproducts
        })
    } catch (error) {
        console.log("error while getting the your products",error)
    }
}