import React, { useState } from "react";
import api from "../utiles/api";
import { useNavigate } from "react-router-dom";
import { CookieUser } from "../utiles/authCookie";



// type ProductsCreate={
//     _id: number,
//     productname: string,
//     productdiscription: string,
//     productprice: number,
//     productrating: number,
//     productcategory: string,
//     images: string[]
// }

const CreateProduct = () => {
    // const [products,setProducts]=useState<ProductsCreate[]>([])
    // const [productname,setProductname]
    const navigate=useNavigate()
    const [productname,setProductname]=useState("");
    const [productdiscription,setProductdiscription]=useState("");
    const [productprice,setProductprice]=useState("");
    const [productrating,setproductrating]=useState("");
    const [productcategory,setProductcategory]=useState("");
    const [images,setImages]=useState<File[]>([]);
    const handleProductTitle=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        setProductname(e.target.value)
    }
    const handleProductDiscription=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        setProductdiscription(e.target.value)
    }
    const handleProductPrice=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        setProductprice(e.target.value)
    }
    const handleProductRating=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        setproductrating(e.target.value)
    }
    const handleProductCategery=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        setProductcategory(e.target.value)
    }
    const handleProductImage=async(e: React.ChangeEvent<HTMLInputElement>)=>{
        const files=e.target.files;
        if(!files){
          return ;
        }
        const picked =Array.from(files);
        console.log("images length",picked)
        if(picked.length>5){
          alert("please upload only 5 images")
          e.target.value=""
          return;
        }
        setImages(picked);

    }
    const handelProduct=async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("productname", productname);
          formData.append("productdiscription", productdiscription);
          formData.append("productrating", productrating);
          formData.append("productprice", productprice);
          formData.append("productcategory", productcategory);

          images.forEach((file) => {
                formData.append("images", file);
              });
            const res=await api.post('/create-product',formData,{
              headers: { "Content-Type": "multipart/form-data" },
              withCredentials: true,
            })
            console.log("product is creacted form frontend",res.data.data)
            // const userCookie=await CookieUser();
            // setUser(userCookie)
            if(res.status===201){
              navigate('/my-products')
            }
            // setProducts(res.data.data)
        } catch (error) {
            
        }
    }
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Create New Product</h2>
          <form onSubmit={handelProduct} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Title</label>
              <input placeholder="Enter product name" value={productname} onChange={handleProductTitle} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <input placeholder="Describe your product" value={productdiscription} onChange={handleProductDiscription} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                <input placeholder="Enter price" value={productprice} onChange={handleProductPrice} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating (0-5)</label>
                <input placeholder="Product rating" value={productrating} onChange={handleProductRating} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <input placeholder="e.g., Electronics, Fashion, Books" value={productcategory} onChange={handleProductCategery} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images (Max 5)</label>
              <input type="file" multiple accept="image/*" onChange={handleProductImage} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-100 file:text-blue-700 file:cursor-pointer" />
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors mt-6">
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;