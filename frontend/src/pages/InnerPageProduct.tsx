import { useEffect, useState } from "react";
import api from "../utiles/api";
import { useParams } from "react-router-dom";


type InnerProduct= {
    _id: number,
    productname: string,
    productdiscription: string,
    productprice: number,
    productrating: number,
    productcategory: string,
    images: string[]
}

const InnerPageProduct = () => {
  const {id}=useParams();
  const BASE_URL = "http://localhost:8080";
    const [innnerproduct,setInnnerproduct]=useState<InnerProduct | null>(null)

    useEffect(()=>{
      const fectedInnerProduct=async()=>{
          const url=await api.get(`inner-detailes/${id}`)
          setInnnerproduct(url.data.data)
          console.log("url data",url.data.data)
      };
      fectedInnerProduct();
    },[id])
  return (
    <div>
      {innnerproduct && <div key={innnerproduct._id}>
              <img src={`${BASE_URL}${innnerproduct.images[0]}`} alt="this the images" />
          <img src={`${BASE_URL}${innnerproduct.images[1]}`} alt="this the images" />
          <h1>{innnerproduct.productname}</h1>
          <p>{innnerproduct.productdiscription}</p>
          <button>{innnerproduct.productprice}</button>
          <button>{innnerproduct.productcategory}</button>
          <p>{innnerproduct.productrating}</p>
        </div>}
    </div>
  );
};

export default InnerPageProduct;