import { useEffect, useState } from "react";
import api from "../utiles/api";


type MyProdocuts={
    _id: number,
    productname: string,
    productdiscription: string,
    productprice: number,
    productrating: number,
    productcategory: string,
    images: string[]
}


const MyProducts = () => {
    const [myproducts,setMyProducts]=useState<MyProdocuts[]>([])
    useEffect(()=>{
        const fetchedData=async()=>{
            const res=await api.get('/my-products',{ withCredentials: true });
            console.log("my-products data",res.data)
            // setMyProducts(res.data.data)
        }
        fetchedData()
    },[])
  return (
    <div>
      <h2>MyProducts</h2>
    </div>
  );
};

export default MyProducts;