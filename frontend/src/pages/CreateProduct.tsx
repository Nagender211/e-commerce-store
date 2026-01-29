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
    <div>
      <form onSubmit={handelProduct}>
            <input placeholder="please enter the product title" value={productname} onChange={handleProductTitle}  />
            <input placeholder="please enter the product productdiscription" value={productdiscription} onChange={handleProductDiscription}  />
            <input placeholder="please enter the product productprice" value={productprice} onChange={handleProductPrice}  />
            <input placeholder="please enter the product productrating" value={productrating} onChange={handleProductRating}  />
            <input placeholder="please enter the product productcategory" value={productcategory} onChange={handleProductCategery}  />
            <input type="file" multiple accept="image/*" onChange={handleProductImage}  />
            <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;