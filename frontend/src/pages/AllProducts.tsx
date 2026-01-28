import { useEffect, useState } from "react";
import api from "../utiles/api";
import { Link } from "react-router-dom";


type Products={
    _id: number,
    productname: string,
    productdiscription: string,
    productprice: number,
    productrating: number,
    productcategory: string,
    images: string[]
}



const AllProducts = () => {
    const BASE_URL = "http://localhost:8080";
    const [products,setProducts]=useState<Products[]>([])
    useEffect(()=>{
        const productsFected=async()=>{
            const res=await api.get('/all-product')
            console.log("all products",res.data.data)
            setProducts(res.data.data)
        };
        productsFected()
    },[])
  return (
    <div>
      <h2>AllProducts</h2>
      {products.length===0 ? (<div><p>No prodcoust are avaiable here</p></div>): (<>{products.map((item)=>(
        <div key={item._id}>
           <Link to={`/product/${item._id}`}>
               <h4>{item.productname}</h4>
            <p>{item.productname}</p>
            <p>{item.productprice}</p>
            <p>{item.productrating}</p>
            <p>{item.productcategory}</p>
            <img src={`${BASE_URL}${item.images[0]}`} alt="first image" />
           </Link>
        </div>
      ))}</>)}
     
    </div>
  );
};

export default AllProducts;